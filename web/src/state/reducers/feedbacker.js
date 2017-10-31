import idx from 'idx';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  UPDATE_ANSWER,
  UPDATE_ROLE,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';

const feedbacker = (state = { language: 'de' }, action) => {
  switch (action.type) {
    case UPDATE_ROLE:
      return Object.assign({}, state, {
        ...state,
        clients: {
          ...state.clients,
          [action.clientId]: {
            ...state.clients[action.clientId],
            role: action.roleId,
          },
        },
      });
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
        language: 'de',
        isFetchingFeedbacker: false,
        id: idx(action, _ => _.feedbacker.id) || '',
        mail: idx(action, _ => _.feedbacker.mail) || '',
        proc: idx(action, _ => _.proc) || {},
        clients: idx(action, _ => _.feedbacker.clients) || {},
      };
    }
    default:
      return state;
  }
};

export default feedbacker;
