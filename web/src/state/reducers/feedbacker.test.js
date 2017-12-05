import deepFreeze from 'deep-freeze';
import feedbacker from './feedbacker';

import {
  DELETE_FEEDBACKER,
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  UPDATE_ANSWER,
  UPDATE_ROLE,
  ADD_CLIENTID,
} from '../actions/feedbacker';

describe('feedbacker reducer for a single feedbacker', () => {
  const state = {
    byId: ['1'],
    byHash: {
      1: {
        id: '1',
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
      feedbackers: [{ id: '2' }],
    });
    expect(changedState.byHash[2].id).toBe('2');
  });

  it('should add an answer', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ANSWER,
      clientId: 'client1',
      questionId: 'question1',
      score: 5,
      feedbackerId: 1,
    });
    expect(changedState.byHash[1].clients.client1.answers.question1).toBe(5);
  });

  it('should update an existing answer', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ANSWER,
      clientId: 'client1',
      questionId: 'question1',
      score: 5,
      feedbackerId: 1,
    });
    expect(changedState.byHash[1].clients.client1.answers.question1).toBe(5);
  });

  it('should update rolId', () => {
    const changedState = feedbacker(state, {
      type: UPDATE_ROLE,
      clientId: 'client1',
      roleId: 'role5',
      feedbackerId: 1,
    });
    expect(changedState.byHash[1].clients.client1.role).toBe('role1');
  });

  it('shoud delete a feedbacker', () => {
    const changedState = feedbacker({
      byId: ['1', '2'],
      byHash: [{ id: '1' }, { id: '2' }],
    }, {
      type: DELETE_FEEDBACKER,
      feedbackerId: '1',
    });
    expect(changedState.byId.length).toEqual(1);
  });

  it('should request a list of feedbackers', () => {
    const changedState = feedbacker(state, {
      type: REQUEST_FEEDBACKER,
    });
    expect(changedState.isFetchingFeedbacker).toBe(true);
  });

  it('should receive a list of feedbackers', () => {
    const changedState = feedbacker(state, {
      type: RECEIVE_FEEDBACKER,
      feedbackers: [{ id: '1' }, { id: '2' }],
    });
    expect(changedState.isFetchingFeedbacker).toBe(false);
    expect(changedState.byId.length).toBe(2);
  });

  it('should add a client to a feedbacker', () => {
    const changedState = feedbacker(state, {
      type: ADD_CLIENTID,
      feedbackerId: 1,
      clientId: 'c3',
      roleId: 'r3',
    });
    expect(changedState.byHash[1].clients.c3.id).toBe('c3');
  });
});
