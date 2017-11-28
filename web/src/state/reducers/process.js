import {
  REQUEST_PROCS,
  RECEIVE_PROCS,
  DELETE_QUESTION,
  REQUEST_UPLOAD_CLIENTS,
  RECEIVE_UPLOAD_CLIENTS,
  DELETE_CLIENT,
  ADD_CLIENT,
} from '../actions/process';

import { removeItem } from '../../utils';

const process = (state = {}, action) => {
  switch (action.type) {
    case ADD_CLIENT: {
      const { procId } = action;
      const clientId = action.client.id;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [procId]: {
            ...state.byHash[procId],
            clients: {
              ...state.byHash[procId].clients,
              [clientId]: action.client,
            },
          },
        },
      });
    }
    case DELETE_CLIENT: {
      const { procId } = action;
      const { clientId } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [procId]: {
            ...state.byHash[procId],
            clients: removeItem(state.byHash[procId].clients, clientId),
          },
        },
      });
    }
    case REQUEST_PROCS:
      return Object.assign({}, state, {
        isFetchingProcs: true,
      });
    case RECEIVE_PROCS:
      return Object.assign({}, state, {
        isFetchingProcs: false,
        byId: action.procs.map(p => p.id),
        byHash: action.procs.reduce((map, obj) => {
          const t = map;
          t[obj.id] = obj;
          return map;
        }, {}),
      });
    case REQUEST_UPLOAD_CLIENTS:
      return Object.assign({}, state, {
        isUploadingClients: true,
      });
    case RECEIVE_UPLOAD_CLIENTS: {
      const { procId } = action;
      return Object.assign({}, state, {
        isUploadingClients: false,
        byHash: {
          ...state.byHash,
          [procId]: {
            ...state.byHash[procId],
            clients: action.clients,
          },
        },
      });
    }
    case DELETE_QUESTION: {
      const { procId, questionaireId, questionId } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [procId]: {
            ...state.byHash[procId],
            questionaires: {
              ...state.byHash[procId].questionaires,
              [questionaireId]: {
                ...state.byHash[procId].questionaires[questionaireId],
                questions:
                  removeItem(
                    state.byHash[procId].questionaires[questionaireId].questions,
                    questionId,
                  ),
              },
            },
          },
        },
      });
    }
    default:
      return state;
  }
};

export default process;
