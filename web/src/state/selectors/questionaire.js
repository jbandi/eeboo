import idx from 'idx';

// get question by id
// return object
export const getQuestionById = (questions, questionId) => (
  idx(questions, _ => _[questionId]) || {}
);

// get a question content by context (he|she|me) and language
// return string
export const getQuestionContentByLanguage = (question, context, language) => (
  idx(question, _ => _.contents[language][context]) || 'no content'
);

// get a role by Id and language
// return object
export const getRoleById = (questionaire, roleId, language) => {
  const roleIdeLower = roleId.toLowerCase();
  const role = idx(questionaire, _ => _.roles[roleIdeLower]) || [];
  return (role)
    ? ({
      content: idx(role, _ => _.contents[language]) || 'no content',
      context: role.context,
      lan: language,
      id: roleId,
    })
    : {};
};

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
  const questionIds = getQuestionsByContextId(
    questions,
    contextId,
  ).map(q => q.id);
  return answerIds.filter(function def(e) {
    return this.indexOf(e) >= 0;
  }, questionIds).length;
};
