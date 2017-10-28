export const REQUEST_SINGLE_FEEDBACKER = 'REQUEST_SINGLE_FEEDBACKER';
export const RECEIVE_SINGLE_FEEDBACKER = 'RECEIVE_SINGLE_FEEDBACKER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    id: answer.id,
    questionId: answer.questionId,
    score: answer.score,
  };
}

function requestSingleFeedbacker() {
  return {
    type: REQUEST_SINGLE_FEEDBACKER,
  };
}

function receiveSingleFeedbacker(feedbacker) {
  return {
    type: RECEIVE_SINGLE_FEEDBACKER,
    feedbacker,
  };
}

export function fetchSingleFeedbacker(id) {
  return (dispatch) => {
    dispatch(requestSingleFeedbacker());
    return fetch(`api/v1/singleFeedbacker/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveSingleFeedbacker(json)),
      );
  };
}
