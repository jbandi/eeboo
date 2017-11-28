import uuidv4 from 'uuid/v4';
import history from '../../services/history';

import Parser from '../../utils/parser';

import { getProcess, clientExists } from '../selectors/process';
import {
  createFeedbackerIfNotExists,
  removeClientId,
  removeFeedbackersWithoutClient,
  postFeedbacker,
} from './feedbacker';

import { getFeedbackerIdsByClientId, getFeedbackers } from '../selectors/feedbacker';

export const REQUEST_PROCS = 'process/REQUEST_PROCS';
export const RECEIVE_PROCS = 'process/RECEIVE_PROCS';
export const DELETE_QUESTION = 'process/DELETE_QUESTION';

export const REQUEST_UPLOAD_CLIENTS = 'process/REQUEST_UPLOAD_CLIENTS';
export const RECEIVE_UPLOAD_CLIENTS = 'process/RECEIVE_UPLOAD_CLIENTS';

export const DELETE_CLIENT = 'process/DELETE_CLIENT';
export const ADD_CLIENT = 'process/ADD_CLIENT';

export function requestUploadClients() {
  return {
    type: REQUEST_UPLOAD_CLIENTS,
  };
}

export function receiveUploadClients(clients, procId) {
  return {
    type: RECEIVE_UPLOAD_CLIENTS,
    clients,
    procId,
  };
}

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

export function deleteClient(procId, clientId) {
  return {
    type: DELETE_CLIENT,
    procId,
    clientId,
  };
}

export function addClient(procId, client) {
  return {
    type: ADD_CLIENT,
    procId,
    client,
  };
}

export function deleteQuestion(procId, questionaireId, questionId) {
  return {
    type: DELETE_QUESTION,
    procId,
    questionaireId,
    questionId,
  };
}

// add a Client if it does not already exist
export function importClients(data, procId) {
  return (dispatch, getState) => {
    const file = data.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => (
      (e) => {
        Parser.parseClients(e.target.result).then((clients) => {
          clients.forEach((client) => {
            if (!clientExists(getState(), procId, client)) {
              dispatch(addClient(procId, client));
              dispatch(createFeedbackerIfNotExists(client, procId));
            }
          });
        });
      }
    ))(file);
    reader.readAsText(file);
  };
}

export function deleteClientAndFeedbackers(procId, clientId) {
  return (dispatch, getState) => {
    dispatch(deleteClient(procId, clientId));
    const feedbackers = getFeedbackerIdsByClientId(getState(), clientId);
    feedbackers.forEach((f) => {
      dispatch(removeClientId(f, clientId));
      dispatch(removeFeedbackersWithoutClient());
    });
  };
}

export function putProc(procId) {
  return (dispatch, getState) => {
    const body = getProcess(getState(), procId);
    return fetch('/api/v1/procs/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(
        response => response.json(),
        error => console.log('An error occured while updating process', error),
      ).then(() => {
        const feedbackers = getFeedbackers(getState());
        feedbackers.forEach(f => dispatch(postFeedbacker(f)));
      });
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
    let body = {};
    if (process.id) {
      // it is an existing process -> update existing
      body = process;
    } else {
      // it is a new process -> add new
      body = {
        id: uuidv4(),
        company: process.company,
        start: process.start,
        end: process.end,
        clients: {},
        questionaires: {
          1234: {
            id: 1234,
            questions: {},
            contexts: {},
            roles: {
              self: {
                id: 'self',
                contents: [
                  { content: 'Ich', lan: 'de' },
                ],
              },
            },
          },
        },
        state: 'configure',
      };
    }
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
      ).then(() => {
        if (!process.id) {
          history.replace('/admin');
        }
      });
  };
}

export function updateProc(procId) {
  return (dispatch, getState) => {
    dispatch(addProc(getProcess(getState(), procId)));
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
