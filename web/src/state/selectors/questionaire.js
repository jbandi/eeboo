import idx from 'idx';

// get a specific questionaire object by id
// return: object
export const getQuestionaire = (state, id) => (
  idx(state, _ => _.questionaire.byId[id]) || {}
);

// get a list of all questionairies
// return: array
export const getQuestionIds = state => (
  state.questionaire.allIds || []
);

export const getQuestionById = (state, questionId) => (
  idx(state, _ => _.questionaire.byId[questionId]) || {}
);

export const getUniqueContextIds = (state) => {
  const all = state.questionaire.allIds.map(id =>
    idx(state, _ => _.questionaire.byId[id].context) || -1);
  return [...new Set(all)]; // unique values only
};

export const getQuestionsByContextId = (state, contextId) => {
  const arr = Object.keys(state.questionaire.byId).map(k => state.questionaire.byId[k]);
  return arr.filter(e => e.context === contextId);
};

export default getQuestionaire;
