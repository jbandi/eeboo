import idx from 'idx';
import { removeItem } from '../../utils';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  REQUEST_FEEDBACKERS,
  RECEIVE_FEEDBACKERS,
  ADD_FEEDBACKERS,
  ADD_FEEDBACKER,
  DELETE_FEEDBACKER,
  UPDATE_ANSWER,
  UPDATE_ROLE,
  CLEAR_ANSWERS,
  REMOVE_CLIENTID,
} from '../actions/feedbacker';

// get the array index for a specific feedbacker
const getIndex = (feedbackers, feedbackerId) => (
  feedbackers.findIndex(f => f.id === feedbackerId)
);

// import { defaultFeedbacker } from './defaultState';
const feedbacker = (state = { language: 'de' }, action) => {
  switch (action.type) {
    case REMOVE_CLIENTID: {
      const feedbackerId = action.feedbackerId;
      const clientId = action.clientId;
      const index = getIndex(state.feedbackers, feedbackerId);
      return Object.assign({}, state, {
        ...state,
        feedbackers: [
          ...state.feedbackers.slice(0, index),
          {
            ...state.feedbackers[index],
            clients: removeItem(state.feedbackers[index].clients, clientId),
          },
          ...state.feedbackers.slice(index + 1),
        ],
      });
    }
    case DELETE_FEEDBACKER: {
      return Object.assign({}, state, {
        ...state,
        feedbackers: state.feedbackers.filter(f => f.id !== action.feedbackerId),
      });
    }
    case ADD_FEEDBACKER:
      return Object.assign({}, state, {
        ...state,
        feedbackers: [...state.feedbackers, action.feedbacker],
      });
    case ADD_FEEDBACKERS:
      return Object.assign({}, state, {
        ...state,
        feedbackers: action.feedbackers,
      });
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
