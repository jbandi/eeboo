import {
  getUniqueContextIds,
  getQuestionById,
  getQuestionsByContextId,
  countAnswersByContextId,
  getRolesByLanguage,
  getRoleById,
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
    const q = feedbacker.proc.questionaires[1234].questions;
    expect(getQuestionsByContextId(q, 1, 'role1', 'de').length).toEqual(2);
  });

  it('should return a count of all answers for a specific context', () => {
    const q = feedbacker.proc.questionaires[1234].questions;
    expect(countAnswersByContextId(q, {
      question2: 3,
      question3: 5,
    }, 1)).toEqual(1);
  });

  it('should return a list of all roles for a given questionaire', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'de')[0].contents.content).toEqual('Arbeitskollege');
  });

  it('should return "not found" as content if langauge not found', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'undef')[0].contents.content).toEqual('not found');
  });

  it('should return a role for a given id', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRoleById(questionaire[1234], 'role1', 'de').content).toEqual('Arbeitskollege');
  });

  it('should return a role for a given id', () => {
    const questionaire = feedbacker.proc.questionaires;
    expect(getRoleById(questionaire[1234], 'role1', 'de').id).toEqual('role1');
  });
});
