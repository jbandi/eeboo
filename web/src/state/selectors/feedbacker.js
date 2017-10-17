import idx from 'idx';

// get a specific feedbacker object by id
// return: object
export const getFeedbacker = (state, feedbackerId) => (
  idx(state, _ => _.feedbacker.byHash[feedbackerId]) || {}
);

// get a list of all feedbackers
// return: array
export const getFeedbackerIds = state => (
  idx(state, _ => _.feedbacker.byId) || []
);

// get all answers by feedbacker id
// return array
export const getFeedbackerAnswers = (state, feedbackerId) => {
  const { answers } = getFeedbacker(state, feedbackerId);
  return answers;
};

// get a specific answer by feedbacker- and question id
// return number
export const getFeedbackerAnswer = (state, feedbackerId, questionId) => {
  const { answers } = getFeedbacker(state, feedbackerId);
  return idx(answers, _ => _[questionId].score) || -1;
};
