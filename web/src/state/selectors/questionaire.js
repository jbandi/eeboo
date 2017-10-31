import idx from 'idx';

export const getQuestionById = (questions, questionId) => (
  idx(questions, _ => _[questionId]) || {}
);

export const getQuestionsByContextId = (questions, contextId) => {
  const questionsArr = Object.keys(questions).map(k => questions[k]);
  return questionsArr.filter(q => q.context === contextId);
};

export const countAnswersByContextId = (questions, answers, contextId) => {
  const answerIds = Object.keys(answers);
  const questionIds = getQuestionsByContextId(questions, contextId).map(q => q.id);
  return answerIds.filter(function def(e) {
    return this.indexOf(e) >= 0;
  }, questionIds).length;
};
