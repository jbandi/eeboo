import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
} from '../actions/feedbacker';

describe('feedbacker reducer', () => {
  const state = {
    feedbacker: {
      id: 1,
      mail: 'mailx',
      clients: {
        client1: {},
        client2: {},
      },
      proc: {
        clients: {},
        questionaires: { 1234: {} },
      },
    },
  };

  const actionContent = {
    feedbacker: {
      id: 1,
      clients: {
        client1: {},
        client2: {},
      },
    },
    proc: {
      clients: {},
      questionaires: {
        1234: {},
      },
    },
  };

  deepFreeze(state);

  it('should request a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: REQUEST_FEEDBACKER,
    });
    expect(changedState.isFetchingFeedbacker).toBe(true);
  });

  it('should receive a new feedbacker', () => {
    const changedState = feedbacker(state, {
      type: RECEIVE_FEEDBACKER,
      feedbacker: actionContent.feedbacker,
    });
    expect(changedState.id).toBe(1);
  });
});
