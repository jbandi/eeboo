import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import {
  fetchProcs,
  addProc,
  deleteQuestion,
  REQUEST_PROCS,
  RECEIVE_PROCS,
  DELETE_QUESTION,
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

  it('should delete a specific question', () => {
    const expectedAction = {
      type: DELETE_QUESTION,
      procId: 1,
      questionaireId: 2,
      questionId: 3,
    };
    expect(deleteQuestion(1, 2, 3)).toEqual(expectedAction);
  });

  it('should add a new process', () => {
    fetchMock
      .postOnce('/api/v1/procs', {
        body: { message: 'Process with id  added' },
        headers: { 'content-type': 'application/json' },
      });

    const store = mockStore({});

    return store.dispatch(addProc({
      company: 'pf',
      start: '4',
      end: '5',
    })).then(() => {
      expect(fetchMock.called('/api/v1/procs')).toBe(true);
    });
  });
});
