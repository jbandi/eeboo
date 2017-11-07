import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchProcs,
  REQUEST_PROCS,
  RECEIVE_PROCS,
} from './process';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('test process actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  const body = ['1', '2'];

  it('should receive list of process Ids', () => {
    fetchMock
      .getOnce('/api/v1/procs', {
        body,
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: REQUEST_PROCS },
      { type: RECEIVE_PROCS,
        procs: ['1', '2'],
      },
    ];
    const store = mockStore({});

    return store.dispatch(fetchProcs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
