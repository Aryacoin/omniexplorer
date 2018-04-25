/*
 *
 * Crowdsales reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CROWDSALES,
  LOAD_CROWDSALES_ERROR,
  LOAD_CROWDSALES_SUCCESS,
  LOAD_CROWDSALES_ECOSYSTEM_PROD,
  LOAD_CROWDSALES_ECOSYSTEM_TEST,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: false,
  status: '',
  crowdsales: [],
  ecosystem: LOAD_CROWDSALES_ECOSYSTEM_PROD,
});

function crowdsalesReducer(state = initialState, action) {
  const { error, ecosystem, payload, type } = action;
  
  switch (type) {
    case LOAD_CROWDSALES:
      debugger;
      return state
        .set('loading', true)
        .set('error', false)
        .set('ecosystem', ecosystem);
    case LOAD_CROWDSALES_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('status', payload.status)
        .set('crowdsales', payload.crowdsales)
    case LOAD_CROWDSALES_ERROR:
      return state
        .set('error', error)
        .set('loading', false);
    default:
      return state;
  }
}

export default crowdsalesReducer;
