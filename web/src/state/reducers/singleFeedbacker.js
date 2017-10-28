import {
  RECEIVE_SINGLE_FEEDBACKER,
  REQUEST_SINGLE_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/singleFeedbacker';

// import { defaultFeedbacker } from './defaultState';

const singleFeedbacker = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SINGLE_FEEDBACKER: {
      return Object.assign({}, state, {
        isFetchingSingleFeedbacker: true,
      });
    }
    case RECEIVE_SINGLE_FEEDBACKER:
      return {
        ...state,
        isFetchingSingleFeedbacker: false,
        client: action.client,
        questionaire: action.questionaire,
        feedbacker: action.feedbacker,
      };
    case UPDATE_ANSWER: {
      const newState = {
        ...state,
        feedbacker: {
          ...state.feedbacker,
          [action.id]: {
            ...state.feedbacker[action.id],
            answers: {
              ...state.feedbacker[action.id].answers,
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

export default singleFeedbacker;
