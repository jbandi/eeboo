import { feedbackerExists, getFeedbackerWithoutClients } from '../selectors/feedbacker';
import { createFeedbacker } from '../../utils';

export const REQUEST_FEEDBACKER = 'feebacker/REQUEST_FEEDBACKER';
export const RECEIVE_FEEDBACKER = 'feedbacker/RECEIVE_FEEDBACKER';
export const REQUEST_FEEDBACKERS = 'feebacker/REQUEST_FEEDBACKERS';
export const RECEIVE_FEEDBACKERS = 'feedbacker/RECEIVE_FEEDBACKERS';
export const ADD_FEEDBACKERS = 'feedbacker/ADD_FEEDBACKERS';
export const ADD_FEEDBACKER = 'feedbacker/ADD_FEEDBACKER';
export const DELETE_FEEDBACKER = 'feedbacker/DELETE_FEEDBACKER';
export const UPDATE_ANSWER = 'feedbacker/UPDATE_ANSWER';
export const UPDATE_ROLE = 'feedbacker/UPDATE_ROLE';
export const CLEAR_ANSWERS = 'feedbacker/CLEAR_ANSWERS';
export const REMOVE_CLIENTID = 'feedbackers/REMOVE_CLIENTID';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    questionId: answer.questionId,
    clientId: answer.clientId,
    score: answer.score,
  };
}

export function addFeedbackers(feedbackers) {
  return {
    type: ADD_FEEDBACKERS,
    feedbackers,
  };
}

export function addFeedbacker(feedbacker) {
  return {
    type: ADD_FEEDBACKER,
    feedbacker,
  };
}

export function deleteFeedbacker(feedbackerId) {
  return {
    type: DELETE_FEEDBACKER,
    feedbackerId,
  };
}

export function clearAnswers(clientId) {
  return {
    type: CLEAR_ANSWERS,
    clientId,
  };
}

export function updateRole(data) {
  return {
    type: UPDATE_ROLE,
    clientId: data.clientId,
    roleId: data.roleId,
  };
}

export function removeClientId(feedbackerId, clientId) {
  return {
    type: REMOVE_CLIENTID,
    clientId,
    feedbackerId,
  };
}

export function requestFeedbacker() {
  return {
    type: REQUEST_FEEDBACKER,
  };
}

export function receiveFeedbacker(data) {
  return {
    type: RECEIVE_FEEDBACKER,
    feedbacker: data.feedbacker,
    proc: data.proc,
  };
}

export function requestFeedbackers() {
  return {
    type: REQUEST_FEEDBACKERS,
  };
}

export function receiveFeedbackers(data) {
  return {
    type: RECEIVE_FEEDBACKERS,
    feedbackers: data,
  };
}

// add a new feedbacker no feedbacker with the same mailaddress exists
export function addFeedbackerIfNotExists(feedbacker) {
  return (dispatch, getState) => {
    if (!feedbackerExists(getState(), feedbacker)) {
      dispatch(addFeedbacker(feedbacker));
    }
  };
}

export function removeFeedbackersWithoutClient() {
  return (dispatch, getState) => {
    const feedbackerIds = getFeedbackerWithoutClients(getState());
    feedbackerIds.forEach(f => dispatch(deleteFeedbacker(f)));
  };
}

// create a new freedbacker from a client
export function createFeedbackerIfNotExists(client) {
  return dispatch => (
    dispatch(addFeedbackerIfNotExists(createFeedbacker(client)))
  );
}

export function fetchFeedbacker(id) {
  return (dispatch) => {
    dispatch(requestFeedbacker());
    return fetch(`/api/v1/singlefeedbacker/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveFeedbacker(json)),
      );
  };
}

export function fetchFeedbackersByProcId(procId) {
  return (dispatch) => {
    dispatch(requestFeedbackers());
    return fetch(`/api/v1/procs/${procId}/feedbackers`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(json =>
        dispatch(receiveFeedbackers(json)),
      );
  };
}

export function deleteFeedbackerFromBackend(feedbackerId) {
  return dispatch => (
    fetch(`/api/v1/feedbackers/${feedbackerId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(
        response => response.json(),
        error => console.log('An error occured while deleting feedbacker', error),
      ).then(() => {
        dispatch(deleteFeedbacker(feedbackerId));
      })
  );
}

export function postFeedbacker() {
  return (dispatch, getState) => {
    const feedbacker = getState().feedbacker;
    const body = {
      id: feedbacker.id,
      mail: feedbacker.mail,
      clients: feedbacker.clients,
      proc: feedbacker.proc.id,
    };
    dispatch(requestFeedbacker());
    return fetch('/api/v1/feedbackers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(
        response => response.json(),
        error => console.log('An error occured while posting feedbacker', error),
      );
  };
}
