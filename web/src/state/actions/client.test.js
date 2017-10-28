import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchClient,
  REQUEST_CLIENT,
  RECEIVE_CLIENT,
} from './client';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test client actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should receive a client and handle coorect action', () => {
    fetchMock
      .getOnce('api/v1/clients/1', {
        body: {
          id: 1,
        },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: REQUEST_CLIENT },
      { type: RECEIVE_CLIENT,
        client: {
          id: 1,
        },
      },
    ];
    const store = mockStore({ id: 1 });
    return store.dispatch(fetchClient(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
