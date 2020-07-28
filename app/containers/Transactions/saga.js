import { all, call, put, select, take } from 'redux-saga/effects';
import { LOAD_TRANSACTIONS, LOAD_UNCONFIRMED, LOAD_EXODUS_TXS, SET_TRANSACTION_TYPE } from 'containers/Transactions/constants';
import { API_URL_BASE, FN_API_URL_BLOCKCHAIN_ADDR } from 'containers/App/constants';
import request from 'utils/request';
import encoderURIParams from 'utils/encoderURIParams';
import getMaxPagesByMedia from 'utils/getMaxPagesByMedia';
import { transactionsLoaded, exodusTxsLoaded } from './actions';
import { makeSelectTransactions } from './selectors';

export function* getUnconfirmed({ addr }) {
  const requestURL = addr
    ? `${API_URL_BASE}/transaction/unconfirmed/${addr}`
    : `${API_URL_BASE}/transaction/unconfirmed`;

  const transactions = yield call(request, requestURL);
  yield put(transactionsLoaded(transactions.data, 1));
}

export function* getExodusTxs({ addr }) {
  const state = yield select(makeSelectTransactions());
  const maxPagesByMedia = getMaxPagesByMedia();
  const page = state.currentPage;
  const offset = page * maxPagesByMedia;
  const requestURL = FN_API_URL_BLOCKCHAIN_ADDR({
    address: addr,
    limit: maxPagesByMedia,
    offset,
  });

  const transactions = yield call(request, requestURL);
  yield put(exodusTxsLoaded(transactions.txs, transactions.txs / maxPagesByMedia, addr, transactions.n_tx));
}

export function* getTransactions({ addr }) {
  const state = yield select(makeSelectTransactions());
  const page = state.currentPage;
  const { txType } = state;

  const requestURL = addr
    ? `${API_URL_BASE}/transaction/address/${page}`
    : `${API_URL_BASE}/transaction/general/${page}`;

  const getTransactionsOptions = {
    type: 'cors',
  };

  const options = { tx_type: txType };

  if (addr) {
    options.addr = addr;
  }
  const body = encoderURIParams({
    addr,
    tx_type: txType,
  });

  Object.assign(getTransactionsOptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const transactions = yield call(request, requestURL, getTransactionsOptions);
  yield put(
    transactionsLoaded(transactions.transactions, transactions.pages, addr, transactions.txcount),
  );
}

function* watchGetTransactions() {
  while (true) {
    const payload = yield take(LOAD_TRANSACTIONS);
    yield call(getTransactions, payload);
  }
}

function* watchGetUnconfirmed() {
  while (true) {
    const payload = yield take(LOAD_UNCONFIRMED);
    yield call(getUnconfirmed, payload);
  }
}

function* watchGetExodusTxs() {
  while (true) {
    const payload = yield take(LOAD_EXODUS_TXS);
    yield call(getExodusTxs, payload);
  }
}

function* watchGetTransactionsByType() {
  while (true) {
    const payload = yield take(SET_TRANSACTION_TYPE);
    yield call(getUnconfirmed, payload);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([
    call(watchGetTransactions),
    call(watchGetTransactionsByType),
    call(watchGetUnconfirmed),
    call(watchGetExodusTxs),
  ]);
}
