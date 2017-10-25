const appState = require('./../models/v1/app-state.js');

function getQuestionaires(req, res) {
  appState.getQuestionaires().then((data) => {
    res.json(data.questionaires);
  });
}

function addQuestionaire(req, res) {
  appState.addQuestionaire(req.body).then((m) => {
    res.json({ message: m.message });
  }).catch((e) => {
    res.json({ message: e.message });
  });
}

function deleteQuestionaire(req, res) {
  appState.deleteQuestionaire(req.params.id).then(() => {
    res.json({ message: `Questionaire ${req.params.id} successfully deleted!` });
  }).catch(() => {
    res.json({ message: `Could not delete Questionaire with id ${req.params.id}!` });
  });
}

function deleteQuestionaires(req, res) {
  appState.deleteQuestionaires().then(() => {
    res.json({ message: 'All Questionaires successfully deleted!' });
  }).catch(() => {
    res.json({ message: 'Could not delete all Questionaires!' });
  });
}

function getQuestionaire(req, res) {
  appState.getQuestionaire(req.params.id).then((data) => {
    res.json(data.questionaire);
  });
}

module.exports = {
  getQuestionaires,
  addQuestionaire,
  getQuestionaire,
  deleteQuestionaires,
  deleteQuestionaire,
};
