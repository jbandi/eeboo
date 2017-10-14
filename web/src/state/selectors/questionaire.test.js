import {
  getQuestionaire,
  getQuestionIds,
  getContextIds, getQuestionById,
  getQuestionsByContextId,
} from './questionaire';

describe('test selectors for questionairies', () => {
  const state = {
    allIds: ['question1'],
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
          {
            lan: 'de',
            role: 2,
            content: 'Frage 1 für Kollegen zu Konfliktmanagement',
          },
          {
            lan: 'en',
            role: 2,
            content: 'question 1 for colleagues, conflict management',
          },
        ],
      },
    },
  };

  it('it should return a specific questionaire from state', () => {
    expect(getQuestionaire(state, 'question1')).toEqual(state.byId.question1);
  });

  it('should return an empty object if id is missing', () => {
    expect(getQuestionaire([{ x: '2' }], 2)).toEqual({});
  });

  it('should return an empty object if id not found', () => {
    expect(getQuestionaire(state, -1)).toEqual({});
  });

  it('should return an array containing all questionaire ids', () => {
    expect(getQuestionIds(state).length).toEqual(1);
    expect(getQuestionIds(state)[0]).toEqual('question1');
  });

  it('should return a list of all context ids', () => {
    expect(getContextIds(state).length).toEqual(1);
    expect(getContextIds(state)[0]).toEqual(1);
  });

  it('should return a question by id', () => {
    expect(getQuestionById(state, 'question1').id).toEqual('question1');
  });

  it('should return an array of all contexts', () => {
    expect(getQuestionsByContextId(state, 1).length).toEqual(1);
  });
});
