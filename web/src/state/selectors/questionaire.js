import idx from 'idx';

// get a specific questionaire object by id
// return: object
export const getQuestionaire = (state, id) => (
  idx(state, _ => _.byId[id]) || {}
);

// get a list of all questionairies
// return: array
export const getQuestionIds = state => (
  state.allIds || []
);

export const getQuestionById = (state, questionId) => (
  idx(state, _ => _.byId[questionId]) || {}
);

export const getContextIds = state => (
  state.allIds.map(id => idx(state, _ => _.byId[id].context) || -1)
);

export const getQuestionsByContextId = (state, contextId) => {
  const arr = Object.keys(state.byId).map(k => state.byId[k]);
  return arr.filter(e => e.context === contextId);
};

export default getQuestionaire;
