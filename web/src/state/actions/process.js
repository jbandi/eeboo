import uuidv4 from 'uuid/v4';
import history from '../../services/history';

import Parser from '../../utils/parser';
import { Language } from '../../utils';

import { getProcess } from '../selectors/process';
import {
  addFeedbacker,
  removeClientId,
  removeFeedbackersWithoutClient,
  postFeedbacker,
} from './feedbacker';

import { getFeedbackerIdsByClientId, getFeedbackerArray } from '../selectors/feedbacker';

export const REQUEST_PROCS = 'process/REQUEST_PROCS';
export const RECEIVE_PROCS = 'process/RECEIVE_PROCS';
export const DELETE_QUESTION = 'process/DELETE_QUESTION';
export const ADD_QUESTIONS = 'process/ADD_QUESTIONS';

export const REQUEST_UPLOAD_CLIENTS = 'process/REQUEST_UPLOAD_CLIENTS';
export const RECEIVE_UPLOAD_CLIENTS = 'process/RECEIVE_UPLOAD_CLIENTS';

export const DELETE_CLIENT = 'process/DELETE_CLIENT';
export const ADD_CLIENT = 'process/ADD_CLIENT';

export const SET_LANGUAGE = 'process/SET_LANGUAGE';

export function setLanguage(procId, language) {
  return {
    type: SET_LANGUAGE,
    procId,
    language,
  };
}

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

export function requestProcs() {
  return {
    type: REQUEST_PROCS,
  };
}

export function receiveProc(proc) {
  return {
    type: RECEIVE_PROCS,
    procs: [proc],
  };
}

export function receiveProcs(procs) {
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

export function addQuestions(procId, questionaireId, questions) {
  return {
    type: ADD_QUESTIONS,
    procId,
    questionaireId,
    questions,
  };
}

// add a Client if it does not already exist
export function importClients(data, procId) {
  return (dispatch) => {
    const file = data.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => (
      (e) => {
        Parser.parseClients(e.target.result, procId).then((res) => {
          res.clients.forEach(client => dispatch(addClient(procId, client)));
          res.feedbackers.forEach(feedbacker => dispatch(addFeedbacker(feedbacker)));
        });
      }
    ))(file);
    reader.readAsText(file);
  };
}

// add a Client if it does not already exist
export function importQuestions(data, procId) {
  return (dispatch) => {
    const file = data.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => (
      (e) => {
        Parser.parseQuestions(e.target.result).then((questions) => {
          const list = {};
          questions.forEach((q) => { list[q.id] = q; });
          dispatch(addQuestions(procId, 1234, list));
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
        const feedbackers = getFeedbackerArray(getState());
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
        dispatch(receiveProcs(json)));
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
            language: Language.DE,
            questions: {},
            contexts: {
              A: {
                id: 'A',
                contents: [
                  { content: 'Kommunikation', lan: 'de' },
                  { content: 'Communication', lan: 'en' }],
              },
              B: {
                id: 'B',
                contents: [
                  { content: 'Teambildung', lan: 'de' },
                  { content: 'Team building', lan: 'en' }],
              },
              C: {
                id: 'C',
                contents: [
                  { content: 'Führen in schwierigen Situationen', lan: 'de' },
                  { content: 'Leading in difficult situations', lan: 'en' }],
              },
              D: {
                id: 'D',
                contents: [
                  { content: 'Coaching/Motivation von Mitarbeitern', lan: 'de' },
                  { content: 'Employee coaching and motivation', lan: 'en' }],
              },
              E: {
                id: 'E',
                contents: [
                  { content: 'Konflikmanagement', lan: 'de' },
                  { content: 'Conflict management', lan: 'en' }],
              },
              F: {
                id: 'F',
                contents: [
                  { content: 'Change Management', lan: 'de' },
                  { content: 'Conflict management', lan: 'en' }],
              },
              G: {
                id: 'G',
                contents: [
                  { content: 'Selbstführung', lan: 'de' },
                  { content: 'Self Management', lan: 'en' }],
              },
              H: {
                id: 'H',
                contents: [
                  { content: 'Interkulturelles Management', lan: 'de' },
                  { content: 'Intercultural management', lan: 'en' }],
              },
              I: {
                id: 'I',
                contents: [
                  { content: 'Diversity Management', lan: 'de' },
                  { content: 'Diversity management', lan: 'en' }],
              },
              J: {
                id: 'J',
                contents: [
                  { content: 'Grundlagen der Führung', lan: 'de' },
                  { content: 'Fundamentals of leadership', lan: 'en' }],
              },
              K: {
                id: 'K',
                contents: [
                  { content: 'Strategie', lan: 'de' },
                  { content: 'Strategy', lan: 'en' }],
              },
            },
            roles: {
              self: {
                id: 'self',
                context: 'self',
                contents: {
                  de: 'ich',
                  en: 'self',
                },
              },
              vorgesetzter: {
                id: 'vorgesetzter',
                contents: {
                  de: 'Vorgesetzter',
                  en: 'boss',
                },
              },
              kollege: {
                id: 'kollege',
                contents: {
                  de: 'Kollege',
                  en: 'collegue',
                },
              },
              kunden: {
                id: 'kunden',
                contents: {
                  de: 'Kunden',
                  en: 'customer',
                },
              },
              mitarbeiter: {
                id: 'mitarbeiter',
                contents: {
                  de: 'Mitarbeiter',
                  en: 'Staff',
                },
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
      ).then(history.replace('/admin'))
  );
}
