import idx from 'idx';

// get the content in a specific language for a given context
// return object
export const getContentByLanguage = (context, lang) => {
  const contents = idx(context, _ => _.contents) || [];
  return contents.find(content => content.lan === lang) || {};
};

export default getContentByLanguage;
