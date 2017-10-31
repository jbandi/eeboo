import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  UPDATE_ANSWER,
} from '../actions/feedbacker';

describe('feedbacker reducer', () => {
  const state = {
    feedbacker: {
      id: 1,
      mail: 'mailx',
      clients: {
        client1: {
          id: 'client1',
          role: 'role1',
          answers: {
            question1: 3,
            question2: 4,
          },
        },
        client2: {
          id: 'client2',
          role: 'role2',
          answers: {},
        },
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

  it('should add an answer', () => {
    const changedState = feedbacker(state.feedbacker, {
      type: UPDATE_ANSWER,
      clientId: 'client2',
      questionId: 'question1',
      score: 5,
    });
    expect(changedState.clients.client2.answers.question1).toBe(5);
  });

  it('should update an existing answer', () => {
    const changedState = feedbacker(state.feedbacker, {
      type: UPDATE_ANSWER,
      clientId: 'client1',
      questionId: 'question1',
      score: 5,
    });
    expect(changedState.clients.client1.answers.question1).toBe(5);
  });
});
