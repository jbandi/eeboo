import {
  RECEIVE_CLIENT,
  REQUEST_CLIENT,
} from '../actions/client';

// import { defaultClient } from './defaultState';

const client = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CLIENT:
      return Object.assign({}, state, {
        isFetchingClient: true,
      });
    case RECEIVE_CLIENT:
      return {
        ...state,
        isFetchingClient: false,
        byId: [
          ...state.byId || [],
          action.client.id,
        ],
        byHash: {
          ...state.byHash,
          [action.client.id]: action.client,
        },
      };
    default:
      return state;
  }
};

export default client;
