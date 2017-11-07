import deepFreeze from 'deep-freeze';
import process from './process';

import {
  REQUEST_PROCS,
  RECEIVE_PROCS,
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
});
