/*
 *
 * Crowdsales reducer
 *
 */
import sortBy from 'lodash/sortBy';
import {
  ECOSYSTEM_PROD,
  ECOSYSTEM_PROD_NAME,
  ECOSYSTEM_TEST_NAME,
} from 'containers/App/constants';
import {
  LOAD_CROWDSALES,
  LOAD_CROWDSALES_SUCCESS,
} from './constants';

import produce from 'immer';

export const initialState = {
  loading: true,
  status: '',
  crowdsales: [],
  ecosystem: ECOSYSTEM_PROD,
};

function crowdsalesReducer(state = initialState, action) {
  const { error, ecosystem, payload, type } = action;

  switch (type) {
    case LOAD_CROWDSALES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('ecosystem', ecosystem)
        .set(
          'ecosystemName',
          ecosystem === ECOSYSTEM_PROD
            ? ECOSYSTEM_PROD_NAME
            : ECOSYSTEM_TEST_NAME,
        );
    case LOAD_CROWDSALES_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('status', payload.status)
        .set('crowdsales', sortBy(payload.crowdsales, 'deadline'));
    default:
      return state;
  }
}

export default crowdsalesReducer;
