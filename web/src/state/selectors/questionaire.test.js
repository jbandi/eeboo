import {
  getUniqueContextIds,
  getQuestionById,
  getQuestionsByContextId,
  countAnswersByContextId,
  getRolesByLanguage,
} from './questionaire';

import feedbacker from './feedbacker-data';

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
      question2: 3,
      question3: 5,
    }, 1)).toEqual(2);
  });

  it('should return a list of all roles for a given questionaire', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'de')[0].contents.content).toEqual('Arbeitskollege');
  });

  it('should return "not found" as content if langauge not found', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'undef')[0].contents.content).toEqual('not found');
  });
});
