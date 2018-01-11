import {
  REQUEST_PROCS,
  RECEIVE_PROCS,
  DELETE_QUESTION,
  ADD_QUESTIONS,
  REQUEST_UPLOAD_CLIENTS,
  RECEIVE_UPLOAD_CLIENTS,
  DELETE_CLIENT,
  ADD_CLIENT,
  SET_LANGUAGE,
  UPDATE_PROCESS,
} from '../actions/process';

import { removeItem } from '../../utils';

const process = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROCESS: {
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [action.process.id]: {
            ...state.byHash[action.process.id],
            company: action.process.company,
            start: action.process.start,
            end: action.process.end,
          },
        },
      });
    }
    case SET_LANGUAGE: {
      const { procId, language } = action;
      return Object.assign({}, state, {
        ...state,
        byHash: {
          ...state.byHash,
          [procId]: {
            ...state.byHash[procId],
            language,
          },
        },
      });
    }
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
    case ADD_QUESTIONS: {
      const { procId, questionaireId, questions } = action;
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
                questions,
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
