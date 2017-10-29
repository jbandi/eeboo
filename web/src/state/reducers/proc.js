import {
  REQUEST_PROC,
  RECEIVE_PROC,
} from '../actions/proc';

const proc = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PROC:
      return Object.assign({}, state, {
        isFetchingProcs: true,
      });
    case RECEIVE_PROC:
      return Object.assign({}, state, {
        isFetchingProcs: false,
        clients: action.clients,
        questionaires: action.questionaires,
      });
    default:
      return state;
  }
};

export default proc;
