import idx from 'idx';

// get question by id
// return object
export const getQuestionById = (questions, questionId) => (
  idx(questions, _ => _[questionId]) || {}
);

// get all questions by contextId
// return array
export const getQuestionsByContextId = (questions, contextId) => {
  const questionsArr = Object.keys(questions).map(k => questions[k]);
  return questionsArr.filter(q => q.context === contextId);
};

// get count of answers by context id
// return number
export const countAnswersByContextId = (questions, answers, contextId) => {
  const answerIds = Object.keys(answers);
  const questionIds = getQuestionsByContextId(questions, contextId).map(q => q.id);
  return answerIds.filter(function def(e) {
    return this.indexOf(e) >= 0;
  }, questionIds).length;
};


// get all roles by Langauge
// return array
export const getRolesByLanguage = (questionaire, language) => {
  const roles = idx(questionaire, _ => _.roles) || {};
  const rolesArray = Object.keys(roles).map(k => roles[k]);
  return rolesArray.map(c => ({
    contents: c.contents.filter(content => content.lan === language)[0] || { content: 'not found' },
    id: c.id,
  }));
};
