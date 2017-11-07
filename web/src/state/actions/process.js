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
    return fetch('api/v1/procs')
      .then(
        response => response.json(),
        error => console.log('An error occured while receiving process list', error),
      )
      .then(json =>
        dispatch(receiveProcs(json)),
      );
  };
}
