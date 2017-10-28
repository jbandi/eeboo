export const REQUEST_CLIENT = 'REQUEST_CLIENT';
export const RECEIVE_CLIENT = 'RECEIVE_CLIENT';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    id: answer.id,
    questionId: answer.questionId,
    score: answer.score,
  };
}

function requestClient() {
  return {
    type: REQUEST_CLIENT,
  };
}

function receiveClient(client) {
  return {
    type: RECEIVE_CLIENT,
    client,
  };
}

export function fetchClient(id) {
  return (dispatch) => {
    dispatch(requestClient());
    return fetch(`api/v1/clients/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveClient(json)),
      );
  };
}
