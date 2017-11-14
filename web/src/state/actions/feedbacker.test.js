import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchFeedbacker,
  fetchFeedbackersByProcId,
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
  REQUEST_FEEDBACKERS,
  RECEIVE_FEEDBACKERS,
} from './feedbacker';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test feedbacker actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
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
      { type: RECEIVE_FEEDBACKER,
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
      { type: RECEIVE_FEEDBACKERS,
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
