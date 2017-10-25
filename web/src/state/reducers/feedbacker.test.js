import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  UPDATE_ANSWER,
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
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
        lastUpdated: '10',
        answers: {
          xy: { score: 3 },
        },
      },
      2: {
        id: 2,
        mail: 'email address',
        role: 1,
        questionaire: '8as8-1s57-1uus-9s73',
        lastUpdated: '10',
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
      questionId: 'ab',
      lastUpdated: '10',
      score: 4,
    });
    expect(changedState.byHash[1].answers.xy.score).toBe(3);
    expect(changedState.byHash[1].answers.ab.score).toBe(4);
    expect(changedState.byId).toEqual(['1', '2']);
  });

  it('should update an existing answer of a specific feedbacker', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ANSWER,
      id: '2',
      questionId: 'cd',
      lastUpdated: '10',
      score: 4,
    });
    expect(changedState.byHash[2].answers.xy.score).toBe(3);
    expect(changedState.byHash[2].answers.cd.score).toBe(4);
    expect(changedState.byId).toEqual(['1', '2']);
  });

  it('should request a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: REQUEST_FEEDBACKER,
    });
    expect(changedState.isFetchingFeedbacker).toBe(true);
  });

  it('should receive a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: RECEIVE_FEEDBACKER,
      feedbacker: {
        id: '3',
        mail: 'mathu at example.com',
        role: 3,
        questionaire: '8as8-1s57-1uus-9s73',
        lastUpdated: '0',
        answers: { question1: { score: 5 } },
      },
    });
    expect(changedState.byHash[3].answers.question1.score).toBe(5);
    expect(changedState.byId.length).toBe(3);
  });
});
