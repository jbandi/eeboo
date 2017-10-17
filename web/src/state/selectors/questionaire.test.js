import {
  getQuestionaire,
  getQuestionIds,
  getUniqueContextIds,
  getQuestionById,
  getQuestionsByContextId,
  countAnswersByContextId,
} from './questionaire';

describe('test selectors for questionairies', () => {
  const state = {
    questionaire: {
      allIds: ['question1', 'question2', 'question3'],
      byId: {
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
      },
    },
  };

  it('it should return a specific questionaire from state', () => {
    expect(getQuestionaire(state, 'question1')).toEqual(state.questionaire.byId.question1);
  });

  it('should return an empty object if id is missing', () => {
    expect(getQuestionaire([{ x: '2' }], 2)).toEqual({});
  });

  it('should return an empty object if id not found', () => {
    expect(getQuestionaire(state, -1)).toEqual({});
  });

  it('should return an array containing all questionaire ids', () => {
    expect(getQuestionIds(state).length).toEqual(3);
    expect(getQuestionIds(state)[0]).toEqual('question1');
  });

  it('should return a list of all unique context ids', () => {
    expect(getUniqueContextIds(state).length).toEqual(1);
    expect(getUniqueContextIds(state)[0]).toEqual(1);
  });

  it('should return a question by id', () => {
    expect(getQuestionById(state, 'question1').id).toEqual('question1');
  });

  it('should return an array of all contexts', () => {
    expect(getQuestionsByContextId(state, 1).length).toEqual(3);
  });

  it('should return a count of all answers for a specific context', () => {
    expect(countAnswersByContextId(state, {
      question2: { score: 3 },
      question3: { score: 4 },
    }, 1)).toEqual(2);
  });
});
