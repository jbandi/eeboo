import idx from 'idx';

// get a specific feedbacker object by id
// return: object
export const getFeedbacker = (state, id) => (
  idx(state, _ => _.feedbacker.byHash[id]) || {}
);

// get a list of all feedbackers
// return: array
export const getFeedbackerIds = state => (
  idx(state, _ => _.feedbacker.byId) || []
);

// get answers by feedbacker id
// return array
export const getFeedbackerAnswers = (state, id) => {
  const { answers } = getFeedbacker(state, id);
  return answers;
};
