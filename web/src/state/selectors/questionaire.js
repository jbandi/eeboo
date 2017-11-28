import idx from 'idx';

// get question by id
// return object
export const getQuestionById = (questions, questionId) => (
  idx(questions, _ => _[questionId]) || {}
);

// get a role by Id
// return object
export const getRoleById = (questionaire, roleId, language) => {
  const roles = idx(questionaire, _ => _.roles[roleId].contents) || [];
  const r = roles.find(role => role.lan === language);
  return (r)
    ? ({
      content: r.content,
      lan: r.lan,
      id: roleId,
    })
    : {};
};

// get all questions by contextId
// return array
export const getQuestionsByContextId = (questions, contextId, roleId, language) => {
  const questionsArr = Object.keys(questions).map(k => questions[k]);
  const l = questionsArr.filter(q => q.context === contextId);
  return l.map(c => ({
    ...c,
    contents: c.contents.filter(content => content.lan === language && content.role === roleId),
  }));
};

// get count of answers by context id
// return number
export const countAnswersByContextId = (questions, answers, contextId, roleId, language) => {
  const answerIds = Object.keys(answers);
  const questionIds = getQuestionsByContextId(
    questions, contextId, roleId, language).map(q => q.id);
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
