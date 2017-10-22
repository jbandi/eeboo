const appState = require('./../models/v1/app-state.js');

function getFeedbackers(req, res) {
  appState.getFeedbackers().then((data) => {
    res.json(data.feedbackers);
  });
}

function getFeedbacker(req, res) {
  appState.getFeedbacker(req.params.id).then((data) => {
    res.json(data.feedbacker);
  });
}

module.exports = { getFeedbackers, getFeedbacker };
