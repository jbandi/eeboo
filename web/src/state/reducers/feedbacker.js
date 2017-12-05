import { removeItem, addItem } from '../../utils';

import {
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  ADD_FEEDBACKER,
  ADD_CLIENTID,
  DELETE_FEEDBACKER,
  UPDATE_ANSWER,
  CLEAR_ANSWERS,
  REMOVE_CLIENTID,
} from '../actions/feedbacker';

// import { defaultFeedbacker } from './defaultState';
const feedbacker = (state = { language: 'de' }, action) => {
  switch (action.type) {
    case REMOVE_CLIENTID: {
      const { feedbackerId, clientId } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [feedbackerId]: {
            ...state.byHash[feedbackerId],
            clients: removeItem(state.byHash[feedbackerId].clients, clientId),
          },
        },
      });
    }
    case ADD_CLIENTID: {
      const { feedbackerId, clientId, roleId } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [feedbackerId]: {
            ...state.byHash[feedbackerId],
            clients: {
              ...state.byHash[feedbackerId].clients,
              [action.clientId]: {
                id: clientId,
                role: roleId,
              },
            },
          },
        },
      });
    }
    case DELETE_FEEDBACKER: {
      const { feedbackerId } = action;
      return Object.assign({}, state, {
        ...state,
        byId: state.byId.filter(id => id !== feedbackerId),
        byHash: removeItem(state.byHash, feedbackerId),
      });
    }
    case ADD_FEEDBACKER:
      return Object.assign({}, state, {
        ...state,
        byId: [...state.byId, ...(action.feedbackers.map(f => f.id))],
        byHash: addItem(state.byHash, action.feedbackers),
      });
    case CLEAR_ANSWERS: {
      const { clientId, feedbackerId } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [feedbackerId]: {
            ...state.byHash[feedbackerId],
            clients: {
              ...state.byHash[feedbackerId].clients,
              [clientId]: {
                ...state.byHash[feedbackerId].clients[clientId],
                answers: {},
              },
            },
          },
        },
      });
    }
    case UPDATE_ANSWER: {
      const {
        clientId,
        feedbackerId,
        score,
        questionId,
      } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [feedbackerId]: {
            ...state.byHash[feedbackerId],
            clients: {
              ...state.byHash[feedbackerId].clients,
              [clientId]: {
                ...state.byHash[feedbackerId].clients[clientId],
                answers: {
                  ...state.byHash[feedbackerId].clients[clientId].answers,
                  [questionId]: score,
                },
              },
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
        language: 'de',
        byId: action.feedbackers.map(f => f.id),
        byHash: action.feedbackers.reduce((map, obj) => {
          const t = map;
          t[obj.id] = obj;
          return map;
        }, {}),
      };
    }
    default:
      return state;
  }
};

export default feedbacker;
