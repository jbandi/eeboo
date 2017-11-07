import idx from 'idx';

// get a list of processes
// return array
export const getProcs = state => (
  idx(state, _ => _.process.byId) || []
);

// get a specific process by its Id
// return object
export const getProcess = (state, id) => (
  idx(state, _ => _.process.byHash[id]) || {}
);
