import {
  getQuestionById,
  getQuestionsByContextId,
  countAnswersByContextId,
  getRolesByLanguage,
  getRoleById,
} from './questionaire';

import { process, questions } from './process-data';

describe('test selectors for questionairies', () => {
  it('should return a question by id', () => {
    expect(getQuestionById(questions, 'question1').id).toEqual('question1');
  });

  it('should return an array of all questions by context id', () => {
    expect(getQuestionsByContextId(questions, 1, 'role1', 'de').length).toEqual(1);
  });

  it('should return a count of all answers for a specific context', () => {
    expect(countAnswersByContextId(questions, {
      question1: 1,
    }, 1)).toEqual(1);
  });

  it('should return a list of all roles for a given questionaire', () => {
    const questionaire = process.byHash[1].questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'de')[0].contents.content).toEqual('Kollege');
  });

  it('should return "not found" as content if langauge not found', () => {
    const questionaire = process.byHash[1].questionaires;
    expect(getRolesByLanguage(questionaire[1234], 'undef')[0].contents.content).toEqual('not found');
  });

  it('should return a role for a given id', () => {
    const questionaire = process.byHash[1].questionaires;
    expect(getRoleById(questionaire[1234], 'role1', 'de').content).toEqual('Kollege');
  });

  it('should return a role for a given id', () => {
    const questionaire = process.byHash[1].questionaires;
    expect(getRoleById(questionaire[1234], 'role1', 'de').id).toEqual('role1');
  });
});
