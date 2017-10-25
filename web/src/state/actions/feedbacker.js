export const REQUEST_FEEDBACKER = 'REQUEST_FEEDBACKER';
export const RECEIVE_FEEDBACKER = 'RECEIVE_FEEDBACKER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    id: answer.id,
    questionId: answer.questionId,
    score: answer.score,
  };
}

function requestFeedbacker() {
  return {
    type: REQUEST_FEEDBACKER,
  };
}

function receiveFeedbacker(feedbacker) {
  return {
    type: RECEIVE_FEEDBACKER,
    feedbacker,
  };
}

export function fetchFeedbacker(id) {
  return (dispatch) => {
    dispatch(requestFeedbacker());
    return fetch(`api/v1/feedbackers/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveFeedbacker(json)),
      );
  };
}
