import idx from 'idx';

// get a list of all context ids
// return: array
export const getContextIds = state => (
  idx(state, _ => _.context.allIds) || []
);

// get a specific context by its id
// return object
export const getContextById = (state, contextId) => (
  idx(state, _ => _.context.byId[contextId]) || {}
);

// get the content in a specific language for a given context
// return object
export const getContentByLanguage = (state, id, language) => {
  const context = getContextById(state, id);
  const contents = idx(context, _ => _.contents) || [];
  return contents.find(content => content.lan === language) || {};
};
