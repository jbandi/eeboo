import uuidv4 from 'uuid/v4';
import history from '../../services/history';

export const REQUEST_PROCS = 'process/REQUEST_PROCS';
export const RECEIVE_PROCS = 'process/RECEIVE_PROCS';

function requestProcs() {
  return {
    type: REQUEST_PROCS,
  };
}

function receiveProcs(procs) {
  return {
    type: RECEIVE_PROCS,
    procs,
  };
}

export function fetchProcs() {
  return (dispatch) => {
    dispatch(requestProcs());
    return fetch('/api/v1/procs')
      .then(
        response => response.json(),
        error => console.log('An error occured while receiving process list', error),
      )
      .then(json =>
        dispatch(receiveProcs(json)),
      );
  };
}

export function addProc(process) {
  return () => {
    const body = {
      id: uuidv4(),
      company: process.company,
      start: process.start,
      end: process.end,
      clients: {},
      questionaires: {},
      state: 'configure',
    };
    return fetch('/api/v1/procs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(
        response => response.json(),
        error => console.log('An error occured while posting process', error),
      ).then(
        history.replace('/admin'),
      );
  };
}

export function deleteProc(id) {
  return () => (
    fetch(`/api/v1/procs/${id}`, {
      method: 'DELETE',
    })
      .then(
        response => response.json(),
        error => console.log(`An error occured while deleting process with id ${id}`, error),
      ).then(
        history.replace('/admin'),
      )
  );
}
