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

// get a list of clients for a specific process
// return array
export const getClients = (state, procId) => {
  const clients = idx(state, _ => _.process.byHash[procId].clients) || [];
  return Object.keys(clients).map(k => clients[k]);
};
