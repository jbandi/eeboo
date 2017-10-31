export const REQUEST_FEEDBACKER = 'feebacker/REQUEST_FEEDBACKER';
export const RECEIVE_FEEDBACKER = 'feedbacker/RECEIVE_FEEDBACKER';
export const UPDATE_ANSWER = 'feedbacker/UPDATE_ANSWER';
export const UPDATE_ROLE = 'feedbacker/UPDATE_ROLE';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    questionId: answer.questionId,
    clientId: answer.clientId,
    score: answer.score,
  };
}

export function updateRole(data) {
  return {
    type: UPDATE_ROLE,
    clientId: data.clientId,
    roleId: data.roleId,
  };
}

function requestFeedbacker() {
  return {
    type: REQUEST_FEEDBACKER,
  };
}

function receiveFeedbacker(data) {
  return {
    type: RECEIVE_FEEDBACKER,
    feedbacker: data.feedbacker,
    proc: data.proc,
  };
}

export function fetchFeedbacker(id) {
  return (dispatch) => {
    dispatch(requestFeedbacker());
    return fetch(`api/v1/singlefeedbacker/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveFeedbacker(json)),
      );
  };
}
