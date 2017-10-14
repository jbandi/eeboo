import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/feedbacker';

describe('feedbacker reducer', () => {
  const state = {
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
          cd: { score: 3 },
        },
      },
    },
  };

  deepFreeze(state);

  it('should add an answer to a specific feedbacker', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ANSWER,
      id: '1',
      question_id: 'ab',
      score: 4,
    });
    expect(changedState[1].answers.xy.score).toBe(3);
    expect(changedState[1].answers.ab.score).toBe(4);
  });

  it('should update an existing answer of a specific feedbacker', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ANSWER,
      id: '2',
      question_id: 'cd',
      score: 4,
    });
    expect(changedState[2].answers.xy.score).toBe(3);
    expect(changedState[2].answers.cd.score).toBe(4);
  });
});
