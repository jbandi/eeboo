import uuidv4 from 'uuid/v4';
import history from '../../services/history';

import { getProcess } from '../selectors/process';

export const REQUEST_PROCS = 'process/REQUEST_PROCS';
export const RECEIVE_PROCS = 'process/RECEIVE_PROCS';
export const DELETE_QUESTION = 'process/DELETE_QUESTION';

export const REQUEST_UPLOAD_CLIENTS = 'process/REQUEST_UPLOAD_CLIENTS';
export const RECEIVE_UPLOAD_CLIENTS = 'process/RECEIVE_UPLOAD_CLIENTS';

export function requestUploadClients() {
  return {
    type: REQUEST_UPLOAD_CLIENTS,
  };
}

export function receiveUploadClients(data, procId) {
  return {
    type: RECEIVE_UPLOAD_CLIENTS,
    clients: data.data,
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

export function deleteQuestion(procId, questionaireId, questionId) {
  return {
    type: DELETE_QUESTION,
    procId,
    questionaireId,
    questionId,
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
        questionaires: {},
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

export function uploadClients(procId, csv) {
  return (dispatch) => {
    dispatch(requestUploadClients());
    return fetch(`/api/v1/procs/${procId}/csvclients`, {
      method: 'POST',
      headers: {
        Accept: 'text/csv',
        'Content-Type': 'text/csv',
      },
      body: csv,
    })
      .then(
        response => response.json(),
        error => console.log('An error occured.', error),
      )
      .then(data => (
        dispatch(receiveUploadClients(data, procId))),
      );
  };
}
