import idx from 'idx';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';

const feedbacker = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_FEEDBACKER:
      return Object.assign({}, state, {
        isFetchingFeedbacker: true,
      });
    case RECEIVE_FEEDBACKER: {
      return {
        isFetchingFeedbacker: false,
        id: idx(action, _ => _.feedbacker.id) || {},
        mail: idx(action, _ => _.feedbacker.mail) || {},
        proc: idx(action, _ => _.proc) || {},
        clients: idx(action, _ => _.feedbacker.clients) || {},
      };
    }
    default:
      return state;
  }
};

export default feedbacker;
