import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';

const feedbacker = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_FEEDBACKER:
      return Object.assign({}, state, {
        isFetchingFeedbacker: true,
      });
    case RECEIVE_FEEDBACKER:
      return {
        isFetchingFeedbacker: false,
        selectedFeedbacker: action.feedbacker.id,
        byId: [
          action.feedbacker.id,
        ],
        byHash: {
          [action.feedbacker.id]: action.feedbacker,
        },
      };
    default:
      return state;
  }
};

export default feedbacker;
