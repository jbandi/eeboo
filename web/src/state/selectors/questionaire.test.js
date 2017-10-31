import {
  getUniqueContextIds,
  getQuestionById,
  getQuestionsByContextId,
  countAnswersByContextId,
} from './questionaire';

describe('test selectors for questionairies', () => {
  const questions = {
    question1: {
      id: 'question1',
      scores: 5,
      context: 1,
      contents: [
        {
          lan: 'de',
          role: 1,
          content: 'Frage 1 für Teamleiter zu Konfliktmanagement',
        },
        {
          lan: 'en',
          role: 1,
          content: 'question 1 for teamleader, conflict management',
        },
      ],
    },
    question2: {
      id: 'question2',
      scores: 5,
      context: 1,
    },
    question3: {
      id: 'question3',
      scores: 5,
      context: 1,
    },
  };

  it('should return a question by id', () => {
    expect(getQuestionById(questions, 'question1').id).toEqual('question1');
  });

  it('should return an array of all questions by context id', () => {
    expect(getQuestionsByContextId(questions, 1).length).toEqual(3);
  });

  it('should return a count of all answers for a specific context', () => {
    expect(countAnswersByContextId(questions, {
      question2: { score: 3 },
      question3: { score: 4 },
    }, 1)).toEqual(2);
  });
});
