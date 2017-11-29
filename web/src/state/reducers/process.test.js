import deepFreeze from 'deep-freeze';
import process from './process';

import {
  REQUEST_PROCS,
  RECEIVE_PROCS,
  DELETE_QUESTION,
} from '../actions/process';

describe('feedbacker reducer', () => {
  const state = {};

  deepFreeze(state);

  it('should request the list of processes', () => {
    const changedState = process(state, {
      type: REQUEST_PROCS,
    });
    expect(changedState.isFetchingProcs).toBe(true);
  });

  it('should receive the list of processes', () => {
    const changedState = process(state, {
      type: RECEIVE_PROCS,
      procs: [{
        id: '1',
        clients: {},
        questionaires: {},
      }],
    });
    expect(changedState.byId[0]).toBe('1');
  });

  it('should delete a apecific question', () => {
    const state2 = {
      byHash: {
        1: {
          clients: {},
          questionaires: {
            1234: {
              contexts: {},
              roles: {},
              questions: {
                q0: { contents: ['1'] },
                q1: { contents: [] },
                q3: { contents: [] },
              },
            },
          },
        },
      },
    };
    deepFreeze(state2);
    const changedState = process(state2, {
      type: DELETE_QUESTION,
      procId: '1',
      questionaireId: 1234,
      questionId: 'q1',
    });
    expect(changedState.byHash[1].questionaires[1234].questions.q1).toBe(undefined);
    expect(changedState.byHash[1].questionaires[1234].questions.q0.contents.length).toBe(1);
  });
});
