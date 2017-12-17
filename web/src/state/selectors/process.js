import idx from 'idx';

import { Language } from '../../utils';

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

// get a client for a specific process
// return object
export const getClient = (state, procId, clientId) => (
  idx(state, _ => _.process.byHash[procId].clients[clientId]) || {}
);

// get a clients for a specific process
// return object
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

// get the process language. return 'de if no language is set'
// return string
export const getLanguage = (state, procId) => (
  idx(state, _ => _.process.byHash[procId].language) || Language.DE
);

// check if a client exist. The test will be made by Mail address
export const clientExists = (state, procId, client) => {
  const clientList = idx(state, _ => _.process.byHash[procId].clients) || {};
  const clientArr = Object.keys(clientList).map(id => clientList[id]);
  return clientArr.find(c => c.mail === client.mail) !== undefined;
};

// get a list of contexts
// return: list of Objects
export const getContexts = (state, procId, questionaireId) => (
  idx(state, _ => _.process.byHash[procId].questionaires[questionaireId].contexts) || {}
);

// get a list of contexts
// return: array
export const getContextsArray = (state, procId, questionaireId) => {
  const contexts = getContexts(state, procId, questionaireId);
  return Object.keys(contexts).map(id => contexts[id]);
};

// get context Ids
// return array
export const getContextIds = (state, procId, questionaireId) => (
  Object.keys(getContexts(state, procId, questionaireId))
);
