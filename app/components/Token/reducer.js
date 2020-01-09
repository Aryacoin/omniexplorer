import produce from 'immer';
import { LOAD_PROPERTY, LOAD_PROPERTY_SUCCESS, LOAD_PROPERTY_CANCEL } from './constants';

export const initialState = {
  tokens: {},
  error: null,
  isFetching: true,
  lastFetched: 0,
};

/* eslint-disable default-case, no-param-reassign */
const propertyReducer = (state = initialState, action = {}) => {
  const { error, payload, type } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD_PROPERTY_CANCEL:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
      case LOAD_PROPERTY:
        draft.lastFetched = 0;
        draft.isFetching = true;
        draft.error = null;
        break;
      case LOAD_PROPERTY_SUCCESS:
        draft.isFetching = false;
        draft.lastFetched = Date.now();
        draft.error = null;
        draft.tokens[payload.propertyid.toString()] = payload;
        break;
    }
  });
};

export default propertyReducer;
