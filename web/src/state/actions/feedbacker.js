import {
  getFirstFeedbacker,
  getFeedbackerByMail,
  feedbackerExists,
  getFeedbackerWithoutClients,
} from '../selectors/feedbacker';
import { createFeedbacker } from '../../utils';

import Parser from '../../utils/parser';

import { receiveProc } from './process';

export const REQUEST_FEEDBACKER = 'feebacker/REQUEST_FEEDBACKER';
export const RECEIVE_FEEDBACKER = 'feedbacker/RECEIVE_FEEDBACKER';
export const ADD_FEEDBACKER = 'feedbacker/ADD_FEEDBACKER';
export const DELETE_FEEDBACKER = 'feedbacker/DELETE_FEEDBACKER';
export const UPDATE_ANSWER = 'feedbacker/UPDATE_ANSWER';
export const CLEAR_ANSWERS = 'feedbacker/CLEAR_ANSWERS';
export const REMOVE_CLIENTID = 'feedbackers/REMOVE_CLIENTID';
export const ADD_CLIENTID = 'feedbacker/ADD_CLIENT';

export function updateAnswer(answer) {
  return {
    type: UPDATE_ANSWER,
    questionId: answer.questionId,
    clientId: answer.clientId,
    score: answer.score,
    feedbackerId: answer.feedbackerId,
  };
}

export function addFeedbackers(feedbackers) {
  return {
    type: ADD_FEEDBACKER,
    feedbackers,
  };
}

export function addFeedbacker(feedbacker) {
  return {
    type: ADD_FEEDBACKER,
    feedbackers: [feedbacker],
  };
}

export function addClientId(feedbackerId, clientId, roleId) {
  return {
    type: ADD_CLIENTID,
    feedbackerId,
    clientId,
    roleId,
  };
}

export function deleteFeedbacker(feedbackerId) {
  return {
    type: DELETE_FEEDBACKER,
    feedbackerId,
  };
}

export function clearAnswers(feedbackerId, clientId) {
  return {
    type: CLEAR_ANSWERS,
    feedbackerId,
    clientId,
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

export function receiveFeedbacker(feedbacker) {
  return {
    type: RECEIVE_FEEDBACKER,
    feedbackers: [feedbacker],
  };
}

export function receiveFeedbackers(feedbackers) {
  return {
    type: RECEIVE_FEEDBACKER,
    feedbackers,
  };
}

// add a Feedbacker if it does not already exist
export function importFeedbackers(data, procId, clientId) {
  return (dispatch, getState) => {
    const file = data.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => (
      (e) => {
        Parser.parseFeedbackers(e.target.result).then((csv) => {
          csv.forEach((f) => {
            const feedbacker = getFeedbackerByMail(getState(), f.mail);
            if (feedbacker !== undefined) {
              dispatch(addClientId(feedbacker.id, clientId, f.role));
            } else {
              dispatch(addFeedbacker(createFeedbacker(
                clientId,
                f.mail,
                procId,
                f.gender,
                f.role,
              )));
            }
          });
        });
      }
    ))(file);
    reader.readAsText(file);
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
export function createFeedbackerIfNotExists(client, procId) {
  return dispatch => (
    dispatch(addFeedbackerIfNotExists(createFeedbacker(client.id, client.mail, procId)))
  );
}

export function fetchFeedbacker(id) {
  return (dispatch) => {
    dispatch(requestFeedbacker());
    return fetch(`/api/v1/singlefeedbacker/${id}`)
      .then(
        response => response.json(),
        error => console.log('An error occured.', error), // eslint-disable-line no-console
      )
      .then((json) => {
        dispatch(receiveProc(json.proc));
        dispatch(receiveFeedbacker(json.feedbacker));
      });
  };
}

export function fetchFeedbackersByProcId(auth, procId) {
  return (dispatch) => {
    dispatch(requestFeedbacker());
    return auth.authFetch(`/api/v1/procs/${procId}/feedbackers`)
      .then(json =>
        dispatch(receiveFeedbackers(json)));
  };
}

export function deleteFeedbackerFromBackend(auth, feedbackerId) {
  return dispatch => (
    auth.authFetch(`/api/v1/feedbackers/${feedbackerId}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch(deleteFeedbacker(feedbackerId));
      })
  );
}

export function postFeedbacker(auth, data) {
  return (dispatch, getState) => {
    const feedbacker = !(data) ? getFirstFeedbacker(getState()) : data;
    const body = {
      id: feedbacker.id,
      mail: feedbacker.mail,
      clients: feedbacker.clients,
      gender: feedbacker.gender,
      proc: feedbacker.proc,
    };
    return auth.authFetch('/api/v1/feedbackers', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };
}
