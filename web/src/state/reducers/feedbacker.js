import idx from 'idx';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  REQUEST_FEEDBACKERS,
  RECEIVE_FEEDBACKERS,
  UPDATE_ANSWER,
  UPDATE_ROLE,
  CLEAR_ANSWERS,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';
const feedbacker = (state = { language: 'de' }, action) => {
  switch (action.type) {
    case CLEAR_ANSWERS:
      return Object.assign({}, state, {
        ...state,
        clients: {
          ...state.clients,
          [action.clientId]: {
            ...state.clients[action.clientId],
            answers: {},
          },
        },
      });
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
    case REQUEST_FEEDBACKERS:
      return Object.assign({}, state, {
        isFetchingFeedbackers: true,
      });
    case RECEIVE_FEEDBACKERS: {
      return {
        isFetchingFeedbackers: false,
        feedbackers: action.feedbackers,
      };
    }
    default:
      return state;
  }
};

export default feedbacker;
