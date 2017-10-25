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

  it('should receive a feedbacker and handle coorect action', () => {
    fetchMock
      .getOnce('api/v1/feedbackers/1', {
        body: {
          id: 1,
        },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: REQUEST_FEEDBACKER },
      { type: RECEIVE_FEEDBACKER,
        feedbacker: {
          id: 1,
        },
      },
    ];
    const store = mockStore({ id: 1 });

    return store.dispatch(fetchFeedbacker(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
