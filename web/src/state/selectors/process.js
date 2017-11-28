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

// get a list of questionaires for a specific process
// return array
export const getQuestionaires = (state, procId) => {
  const questionaires = idx(state, _ => _.process.byHash[procId].questionaires) || [];
  return Object.keys(questionaires).map(k => questionaires[k]);
};

// get a specific questionaire
// return object
export const getQuestionaire = (state, procId, questionaireId) => (
  idx(state, _ => _.process.byHash[procId].questionaires[questionaireId]) || {}
);

// check if a client exist. The test will be made by Mail address
export const clientExists = (state, procId, client) => {
  const clientList = idx(state, _ => _.process.byHash[procId].clients) || {};
  const clientArr = Object.keys(clientList).map(id => clientList[id]);
  return clientArr.find(c => c.mail === client.mail) !== undefined;
};
