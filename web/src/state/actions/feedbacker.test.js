import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchFeedbacker,
  REQUEST_FEEDBACKER,
  RECEIVE_FEEDBACKER,
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
});
