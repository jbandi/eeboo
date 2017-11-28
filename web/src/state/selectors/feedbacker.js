import idx from 'idx';

// get a specific feedbacker object by id
// return: object
export const getFeedbacker = state => (
  idx(state, _ => _.feedbacker) || {}
);

// get a role by a client id
// return object
export const getRoleIdByClientId = (feedbacker, clientId) => (
  idx(feedbacker, _ => _.clients[clientId].role) || -1
);

// check if a list of clients contain a specific id
// return boolean
export const clientsContainId = (clients, id) => (
  Object.keys(clients).find(c => c === id) !== undefined
);

// get a list of feedbackerIds that contain a specific clientId
// return an array
export const getFeedbackerIdsByClientId = (state, clientId) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
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
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  const res = [];
  feedbackers.forEach((f) => {
    if (clientsContainId(f.clients, clientId)) {
      res.push(f);
    }
  });
  return res;
};

// get Client Ids
// return array
export const getFeedbackerClientIds = state => (
  Object.keys(idx(state, _ =>
    _.feedbacker.clients) || {}).map(key => key)
);

// get a list of feedbackers without clients
export const getFeedbackerWithoutClients = (state) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  return feedbackers.filter(f => Object.keys(f.clients).length <= 0).map(f => f.id);
};

// get a specific answer by client id and question Id
// return number
export const getFeedbackerAnswer = (state, clientId, questionId) => (
  idx(state, _ => _.feedbacker.clients[clientId].answers[questionId]) || -1
);

// get all answers by client id
// return list of objects
export const getFeedbackerAnswers = (state, clientId) => (
  (idx(state, _ => _.feedbacker.clients[clientId].answers) || {})
);

// get a specific client by Id
// return object
export const getClientById = (state, clientId) => (
  idx(state, _ => _.feedbacker.proc.clients[clientId]) || {}
);

export const getQuestionaireByClientId = (state, clientId) => {
  const questionaireId = idx(getClientById(clientId), _ => _.questionaire) || -1;
  return idx(state, _ => _.feedbacker.proc[questionaireId]) || {};
};

// get context list
// return list of objects
export const getContexts = (state, questionaireId) => (
  idx(state, _ => _.feedbacker.proc.questionaires[questionaireId].contexts) || {}
);

// get context Ids
// return array
export const getContextIds = (state, questionaireId) => (
  Object.keys(getContexts(state, questionaireId))
);

// get a list of feedbackers
// return array
export const getFeedbackers = state => (
  idx(state, _ => _.feedbacker.feedbackers) || []
);

// check if a feedbacker exists. Test will be done by Mail address
export const feedbackerExists = (state, feedbacker) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  return feedbackers.find(f => f.mail === feedbacker.mail) !== undefined;
};

// check if a feedbacker exists. Test will be done by Mail address
export const getFeedbackerByMail = (state, mail) => {
  const feedbackers = idx(state, _ => _.feedbacker.feedbackers) || [];
  return feedbackers.find(f => f.mail === mail);
};
