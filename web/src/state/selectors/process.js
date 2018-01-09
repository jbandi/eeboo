import idx from 'idx';

import {
  getFeedbackerClientIds,
  getFeedbackersByClientId,
  getFeedbackerAnswer,
} from './feedbacker';

import { getQuestionsByContextId, getRoleById } from './questionaire';
import { getContentByLanguage } from './context';

import { Language } from '../../utils';

// get a list of processes
// return array
export const getProcs = state => (
  idx(state, _ => _.process.byId) || []
);

// get a specific process by its Id
// return object
export const getProcess = (state, id) => (
  idx(state, _ => _.process.byHash[id]) || {}
);

// get a client for a specific process
// return object
export const getClient = (state, procId, clientId) => (
  idx(state, _ => _.process.byHash[procId].clients[clientId]) || {}
);

// get a clients for a specific process
// return object
export const getClients = (state, procId) => {
  const clients = idx(state, _ => _.process.byHash[procId].clients) || [];
  return Object.keys(clients).map(k => clients[k]);
};

// get a list of clients for a specific Feedbacker
// return array
export const getClientsByFeedbackerId = (state, feedbacker) => {
  const clientIds = getFeedbackerClientIds(state, feedbacker.id);
  const clients = getClients(state, feedbacker.proc);
  return clientIds.map(id => clients[id]);
};


// get a list of questionaires for a specific process
// return array
export const getQuestionaires = (state, procId) => {
  const questionaires = idx(state, _ => _.process.byHash[procId].questionaires) || [];
  return Object.keys(questionaires).map(k => questionaires[k]);
};

// get a specific questionaire
// return object
export const getQuestionaire = (state, procId, questionaireId) => (
  idx(state, _ => _.process.byHash[procId].questionaires[questionaireId]) || {}
);

// get total number of questions
// return number
export const getNumQuestions = (state, procId, questionaireId) => {
  const q = idx(state, _ => _.process.byHash[procId].questionaires[questionaireId].questions) || {};
  return Object.keys(q).length;
};

// get the process language. return 'de if no language is set'
// return string
export const getLanguage = (state, procId) => (
  idx(state, _ => _.process.byHash[procId].language) || Language.DE
);

// check if a client exist. The test will be made by Mail address
export const clientExists = (state, procId, client) => {
  const clientList = idx(state, _ => _.process.byHash[procId].clients) || {};
  const clientArr = Object.keys(clientList).map(id => clientList[id]);
  return clientArr.find(c => c.mail === client.mail) !== undefined;
};

// get a list of contexts
// return: list of Objects
export const getContexts = (state, procId, questionaireId) => (
  idx(state, _ => _.process.byHash[procId].questionaires[questionaireId].contexts) || {}
);

// get a list of contexts
// return: array
export const getContextsArray = (state, procId, questionaireId) => {
  const contexts = getContexts(state, procId, questionaireId);
  return Object.keys(contexts).map(id => contexts[id]);
};

// get context Ids
// return array
export const getContextIds = (state, procId, questionaireId) => (
  Object.keys(getContexts(state, procId, questionaireId))
);

// get a specific context by its id
// return object
export const getContextById = (state, procId, questionaireId, contextId) => {
  const contexts = getContexts(state, procId, questionaireId);
  return (contexts[contextId]) ? contexts[contextId] : {};
};

const chartColor = [
  'rgba(8,48,107,0.7)',
  'rgba(8,81,156,0.7)',
  'rgba(33,113,181,0.7)',
  'rgba(66,146,198,0.7)',
  'rgba(107,174,214,0.7)',
  'rgba(158,202,225,0.7)',
  'rgba(198,219,239,0.7)',
  'rgba(222,235,247,0.7)',
  'rgba(247,251,255,0.7)',
];

const createBarData = (labels, data) => ({
  labels,
  datasets: [{
    label: '# of Votes',
    data,
    borderWidth: 1,
    backgroundColor: chartColor,
  }],
});

const getLabel = (lang, rating) => {
  if (rating === 'self') {
    switch (lang) {
      case 'de':
        return 'Selbsteinschätzung';
      case 'en':
        return 'self rating';
      default:
        return 'Selbsteinschätzung';
    }
  } else {
    switch (lang) {
      case 'de':
        return 'Fremdeinschätzung';
      case 'en':
        return 'foreign rating';
      default:
        return 'Fremdeinschätzung';
    }
  }
};

const createRadarData = (labels, foreign, self, lang) => ({
  labels,
  datasets: [{
    label: getLabel(lang, 'foreign'),
    data: foreign,
    borderWidth: 3,
    borderColor: chartColor[1],
    backgroundColor: chartColor[2],
  }, {
    label: getLabel(lang, 'self'),
    data: self,
    borderWidth: 3,
    borderColor: chartColor[4],
    backgroundColor: chartColor[6],
  }],
});

// create Data by context
// return an array of objects
export const createDataByContext = (state, procId, clientId, questionaireId) => {
  const foreign = {};
  const self = {};
  const { questions } = getQuestionaire(state, procId, questionaireId);
  const contextsObj = getContexts(state, procId, questionaireId);
  const contextsArr = Object.keys(contextsObj).map(key => (contextsObj[key]));
  const feedbackers = getFeedbackersByClientId(state, clientId);
  contextsArr.forEach((context) => {
    const questionsByContext = getQuestionsByContextId(questions, context.id);
    questionsByContext.forEach((question) => {
      feedbackers.forEach((feedbacker) => {
        const count = getFeedbackerAnswer(state, feedbacker.id, clientId, question.id);
        const { role } = feedbacker.clients[clientId];
        if (role !== 'self') {
          if (!foreign[context.id]) {
            foreign[context.id] = { total: 0, count: 0 };
          }
          if (count > 0) {
            foreign[context.id].total += count;
            foreign[context.id].count += 1;
          }
        } else {
          if (!self[context.id]) {
            self[context.id] = { total: 0, count: 0 };
          }
          if (count > 0) {
            self[context.id].total += count;
            self[context.id].count += 1;
          }
        }
      });
    });
  });
  return { foreign, self };
};

// create Data by role and context
// return object
export const createDataByRoleAndContext = (state, procId, clientId, context, questionaireId) => {
  const res = {};
  const { questions } = getQuestionaire(state, procId, questionaireId);
  const questionsByContext = getQuestionsByContextId(questions, context.id);
  const feedbackers = getFeedbackersByClientId(state, clientId);
  questionsByContext.forEach((question) => {
    feedbackers.forEach((feedbacker) => {
      const count = getFeedbackerAnswer(state, feedbacker.id, clientId, question.id);
      const { role } = feedbacker.clients[clientId];
      if (!res[role]) {
        res[role] = {
          total: 0,
          count: 0,
        };
      }
      if (count > 0) {
        res[role].total += count;
        res[role].count += 1;
      }
    });
  });
  return res;
};

// get Data by context
// return chart.js data object
export const getDataByContext = (state, procId, clientId, questionaireId, lang = 'de') => {
  const { foreign, self } = createDataByContext(state, procId, clientId, questionaireId);
  return (
    createRadarData(
      Object.keys(foreign).map(contextId => (
        getContentByLanguage(
          getContextById(state, procId, questionaireId, contextId),
          lang,
        ).content
      )),
      Object.keys(foreign).map(key => (foreign[key].total / foreign[key].count)),
      Object.keys(self).map(key => (self[key].total / self[key].count)),
      lang,
    )
  );
};

// get Data by role and context
// return chart.js data object
export const getDataByRoleAndContext = (state, procId, clientId, context, questionaireId, lang = 'de') => {
  const data = createDataByRoleAndContext(state, procId, clientId, context, questionaireId);
  const questionaire = getQuestionaire(state, procId, questionaireId);
  return (
    createBarData(
      Object.keys(data).map(key => getRoleById(questionaire, key, lang).content),
      Object.keys(data).map(key => (data[key].total / data[key].count)),
    )
  );
};
