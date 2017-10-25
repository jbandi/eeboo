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
        ...state,
        isFetchingFeedbacker: false,
        byId: [
          ...state.byId || [],
          action.feedbacker.id,
        ],
        byHash: {
          ...state.byHash,
          [action.feedbacker.id]: action.feedbacker,
        },
      };
    case UPDATE_ANSWER: {
      const newState = {
        ...state,
        byHash: {
          ...state.byHash,
          [action.id]: {
            ...state.byHash[action.id],
            answers: {
              ...state.byHash[action.id].answers,
              [action.questionId]: { score: action.score },
            },
          },
        },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default feedbacker;
