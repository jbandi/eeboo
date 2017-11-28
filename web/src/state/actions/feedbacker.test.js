import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchFeedbacker,
  fetchFeedbackersByProcId,
  addFeedbackers,
  deleteFeedbacker,
  updateAnswer,
  updateRole,
  removeClientId,
  receiveFeedbacker,
  requestFeedbacker,
  receiveFeedbackers,
  requestFeedbackers,
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKERS,
  RECEIVE_FEEDBACKERS,
  ADD_FEEDBACKERS,
  DELETE_FEEDBACKER,
  UPDATE_ANSWER,
  UPDATE_ROLE,
  REMOVE_CLIENTID,
} from './feedbacker';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test feedbacker actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should update an Answer', () => {
    const expectedActions = {
      type: UPDATE_ANSWER,
      questionId: '1',
      clientId: '2',
      score: 3,
    };
    expect(updateAnswer({
      questionId: '1',
      clientId: '2',
      score: 3,
    })).toEqual(expectedActions);
  });

  it('should request a feedbacker', () => {
    const expectedActions = {
      type: REQUEST_FEEDBACKER,
    };
    expect(requestFeedbacker()).toEqual(expectedActions);
  });

  it('should receive a feedbacker', () => {
    const expectedActions = {
      type: RECEIVE_FEEDBACKER,
      feedbacker: 'f1',
      proc: 'p1',
    };
    expect(receiveFeedbacker({ feedbacker: 'f1', proc: 'p1' })).toEqual(expectedActions);
  });

  it('should request a feedbackers', () => {
    const expectedActions = {
      type: REQUEST_FEEDBACKERS,
    };
    expect(requestFeedbackers()).toEqual(expectedActions);
  });

  it('should receive a RECEIVE_FEEDBACKERS', () => {
    const expectedActions = {
      type: RECEIVE_FEEDBACKERS,
      feedbackers: 'data',
    };
    expect(receiveFeedbackers('data')).toEqual(expectedActions);
  });

  it('should update a role', () => {
    const expectedActions = {
      type: UPDATE_ROLE,
      clientId: '1',
      roleId: '2',
    };
    expect(updateRole({ clientId: '1', roleId: '2' })).toEqual(expectedActions);
  });

  it('should remove a clientId', () => {
    const expectedActions = {
      type: REMOVE_CLIENTID,
      clientId: '1',
      feedbackerId: '2',
    };
    expect(removeClientId('2', '1')).toEqual(expectedActions);
  });

  it('should add a feedbafker', () => {
    const expectedActions = {
      type: ADD_FEEDBACKERS,
      feedbackers: [{ id: '1' }],
    };
    expect(addFeedbackers([{ id: '1' }])).toEqual(expectedActions);
  });

  it('should delete a feedbafker', () => {
    const expectedActions = {
      type: DELETE_FEEDBACKER,
      feedbackerId: '1',
    };
    expect(deleteFeedbacker('1')).toEqual(expectedActions);
  });

  const body = {
    feedbacker: {
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
    },
  };

  it('should receive a feedbacker and handle coorect action', () => {
    fetchMock
      .getOnce('/api/v1/singlefeedbacker/1', {
        body,
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: REQUEST_FEEDBACKER },
      {
        type: RECEIVE_FEEDBACKER,
        feedbacker: {
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
        },
      },
    ];
    const store = mockStore({ id: 1 });

    return store.dispatch(fetchFeedbacker(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  const feedbackers = [
    {
      clients: {},
      id: 'feedbacker1',
      mail: 'feedbacker1@example.com',
      proc: '1',
    }, {
      clients: {},
      id: 'feedbacker2',
      mail: 'feedbacker2@example.com',
      proc: '1',
    },
  ];

  it('should receive a list of feedbackers and handle coorect action', () => {
    fetchMock
      .getOnce('/api/v1/procs/1/feedbackers', {
        body: feedbackers,
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: REQUEST_FEEDBACKERS },
      {
        type: RECEIVE_FEEDBACKERS,
        feedbackers: [{
          id: 'feedbacker1',
          clients: {},
          mail: 'feedbacker1@example.com',
          proc: '1',
        }, {
          id: 'feedbacker2',
          clients: {},
          mail: 'feedbacker2@example.com',
          proc: '1',
        }],
      },
    ];
    const store = mockStore({ id: 1 });

    return store.dispatch(fetchFeedbackersByProcId('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
