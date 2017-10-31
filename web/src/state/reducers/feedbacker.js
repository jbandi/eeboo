import idx from 'idx';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';

const feedbacker = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ANSWER: {
      const clientId = action.clientId;
      const questionId = action.questionId;
      return Object.assign({}, state, {
        ...state,
        clients: {
          ...state.clients,
          [clientId]: {
            ...state.clients[clientId],
            answers: {
              ...state.clients[clientId].answers,
              [questionId]: action.score,
            },
          },
        },
      });
    }
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
