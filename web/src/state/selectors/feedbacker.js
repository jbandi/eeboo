import idx from 'idx';

// get the first feedbacker in the state feedbacker object by id
// return: object
export const getFirstFeedbacker = (state) => {
  const id = idx(state, _ => _.feedbacker.byId[0]) || -1;
  return idx(state, _ => _.feedbacker.byHash[id]) || {};
};

// get a the  id for the first feedbacker in the list
// return: string
export const getFirstFeedbackerId = state => (
  getFirstFeedbacker(state).id
);

export const getFirstFeedbackerProc = state => (
  getFirstFeedbacker(state).proc
);

// get a role by a client id
// return object
export const getRoleIdByClientId = (state, feedbackerId, clientId) => (
  idx(state, _ => _.feedbacker.byHash[feedbackerId].clients[clientId].role) || -1
);

// get the process Id
// return string
export const getProcessId = (state, feedbackerId) => (
  idx(state, _ => _.feedbacker.byHash[feedbackerId].proc) || ''
);

// check if a list of clients contain a specific id
// return boolean
export const clientsContainId = (clients, id) => (
  Object.keys(clients).find(c => c === id) !== undefined
);

// get a list of feedbacker ids
// return: array
export const getFeedbackerIds = state => (
  idx(state, _ => _.feedbacker.byId) || []
);

// get a list of feedbackers
// return: array
export const getFeedbackerArray = (state) => {
  const ids = getFeedbackerIds(state);
  const arr = [];
  ids.forEach(id => arr.push(state.feedbacker.byHash[id]));
  return arr;
};

// get a list of feedbackerIds that contain a specific clientId
// return an array
export const getFeedbackerIdsByClientId = (state, clientId) => {
  const feedbackers = getFeedbackerArray(state);
  const res = [];
  feedbackers.forEach((f) => {
    if (clientsContainId(f.clients, clientId)) {
      res.push(f.id);
    }
  });
  return res;
};

// get a list of feedbackers that contain a specific clientId
// return an array
export const getFeedbackersByClientId = (state, clientId) => {
  const feedbackers = getFeedbackerArray(state);
  return feedbackers.filter(f => clientsContainId(f.clients, clientId));
};

// get Client Ids
// return array
export const getFeedbackerClientIds = (state, feedbackerId) => (
  Object.keys(idx(state, _ =>
    _.feedbacker.byHash[feedbackerId].clients) || {}).map(key => key)
);

// get a list of feedbackers without clients
export const getFeedbackerWithoutClients = (state) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  return feedbackers.filter(f => Object.keys(f.clients).length <= 0).map(f => f.id);
};

// get a specific answer by client id and question Id
// return number
export const getFeedbackerAnswer = (state, feedbackerId, clientId, questionId) => (
  idx(state, _ => _.feedbacker.byHash[feedbackerId].clients[clientId].answers[questionId]) || -1
);

// get all answers by client id
// return list of objects
export const getFeedbackerAnswers = (state, feedbackerId, clientId) => (
  (idx(state, _ => _.feedbacker.byHash[feedbackerId].clients[clientId].answers) || {})
);

// get a specific client by Id
// return object
export const getClientById = (state, feedbackerId, clientId) => (
  idx(state, _ => _.feedbacker.byHash[feedbackerId].clients[clientId]) || {}
);

export const getQuestionaireByClientId = (state, clientId) => {
  const questionaireId = idx(getClientById(clientId), _ => _.questionaire) || -1;
  return idx(state, _ => _.feedbacker.proc[questionaireId]) || {};
};

// check if a feedbacker exists. Test will be done by Mail address
export const feedbackerExists = (state, feedbacker) => {
  const feedbackers = getFeedbackerArray(state);
  return feedbackers.find(f => f.mail === feedbacker.mail) !== undefined;
};

// check if a feedbacker exists. Test will be done by Mail address
export const getFeedbackerByMail = (state, mail) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  return feedbackers.find(f => f.mail === mail);
};
