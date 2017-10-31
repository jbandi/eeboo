import idx from 'idx';


// get a specific context by its id
// return object
export const getContextById = (contexts, contextId) => (
  idx(contexts, _ => _[contextId]) || {}
);

// get the content in a specific language for a given context
// return object
export const getContentByLanguage = (contexts, id, language) => {
  const context = getContextById(contexts, id);
  const contents = idx(context, _ => _.contents) || [];
  return contents.find(content => content.lan === language) || {};
};
