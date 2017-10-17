import {
  getFeedbacker,
  getFeedbackerAnswers,
  getFeedbackerIds,
  getFeedbackerAnswer,
} from './feedbacker';

describe('test selectors for feedbackers', () => {
  const state = {
    feedbacker: {
      byId: ['1', '2'],
      byHash: {
        1: {
          id: '1',
          mail: 'mathu at example.com',
          role: 1,
          questionaire: '8as8-1s57-1uus-9s73',
          answers: {
            xy: { score: 3 },
          },
        },
        2: {
          id: 2,
          mail: 'email address',
          role: 1,
          questionaire: '8as8-1s57-1uus-9s73',
          answers: {
            xy: { score: 3 },
            cd: { score: 4 },
          },
        },
      },
    },
  };

  it('it should return a specific feedbacker from state', () => {
    expect(getFeedbacker(state, 2)).toEqual(state.feedbacker.byHash[2]);
  });

  it('should return an empty object if id is missing', () => {
    expect(getFeedbacker([{ mail: '2' }], 2)).toEqual({});
  });

  it('should return an empty object if id not found', () => {
    expect(getFeedbacker(state, -1)).toEqual({});
  });

  it('should return all answers of a specific feedbacker as array', () => {
    expect(getFeedbackerAnswers(state, 2).xy.score).toEqual(3);
    expect(getFeedbackerAnswers(state, 2).cd.score).toEqual(4);
  });

  it('should return an array containing all feedbacker ids', () => {
    expect(getFeedbackerIds(state).length).toEqual(2);
    expect(getFeedbackerIds(state)[1]).toEqual('2');
  });

  it('should return the score of an answer for a specific question of a given feedbacker', () => {
    expect(getFeedbackerAnswer(state, 2, 'cd')).toEqual(4);
  });

  it('should return -1 if no answer or no score was found', () => {
    expect(getFeedbackerAnswer(state, 2, 'doesNotExist')).toEqual(-1);
  });
});
