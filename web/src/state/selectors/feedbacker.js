import idx from 'idx';

// get a specific feedbacker object by id
// return: object
export const getFeedbacker = state => (
  idx(state, _ => _.feedbacker) || {}
);

// get Client Ids
// return array
export const getFeedbackerClientIds = state => (
  Object.keys(idx(state, _ =>
    _.feedbacker.clients) || {}).map(key => key)
);

// get all answers by client id
// return list of objects
export const getFeedbackerAnswers = (state, clientId, questionId) => (
  idx(state, _ => _.feedbacker.clients[clientId].answers[questionId]) || -1
);

// get a specific answer by feedbacker- and question id
// return number
export const getFeedbackerAnswer = (state, feedbackerId, questionId) => {
  const { answers } = getFeedbacker(state, feedbackerId);
  return idx(answers, _ => _[questionId].score) || -1;
};

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
