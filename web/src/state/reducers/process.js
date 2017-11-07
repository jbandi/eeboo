import {
  REQUEST_PROCS,
  RECEIVE_PROCS,
} from '../actions/process';

const process = (state = {}, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default process;
