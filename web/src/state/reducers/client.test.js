import deepFreeze from 'deep-freeze';
import client from './client';

import {
  UPDATE_ANSWER,
  REQUEST_CLIENT,
  RECEIVE_CLIENT,
} from '../actions/client';

describe('client reducer', () => {
  const state = {
    byId: ['1', '2'],
    byHash: {
      1: {
        id: '1',
        mail: 'mathu at example.com',
        questionaire: '8as8-1s57-1uus-9s73',
        feedbackers: [1, 2],
      },
      2: {
        id: 2,
        mail: 'email address',
        questionaire: '8as8-1s57-1uus-9s73',
        feedbackers: [3, 4],
      },
    },
  };

  deepFreeze(state);

  it('should request a new client', () => {
    const changedState = client(state, {
      type: REQUEST_CLIENT,
    });
    expect(changedState.isFetchingClient).toBe(true);
  });

  it('should receive a new client', () => {
    const changedState = client(state, {
      type: RECEIVE_CLIENT,
      client: {
        id: '3',
        mail: 'mathu at example.com',
        questionaire: '8as8-1s57-1uus-9s73',
        feedbackers: [5, 6],
      },
    });
    expect(changedState.byHash[3].id).toBe('3');
    expect(changedState.byId.length).toBe(3);
  });
});
