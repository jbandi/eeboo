const appState = require('./../models/v1/app-state.js');

function getFeedbackers(req, res) {
  appState.getFeedbackers().then((data) => {
    res.json(data.feedbackers);
  });
}

function addFeedbacker(req, res) {
  appState.addFeedbacker(req.body).then((m) => {
    res.json({ message: m.message });
  }).catch((e) => {
    res.json({ message: e.message });
  });
}

function deleteFeedbacker(req, res) {
  appState.deleteFeedbacker(req.params.id).then(() => {
    res.json({ message: `Feedbacker ${req.params.id} successfully deleted!` });
  }).catch(() => {
    res.json({ message: `Could not delete Feedbacker with id ${req.params.id}!` });
  });
}

function deleteFeedbackers(req, res) {
  appState.deleteFeedbackers().then(() => {
    res.json({ message: 'All Feedbackers successfully deleted!' });
  }).catch(() => {
    res.json({ message: 'Could not delete all Feedbackers!' });
  });
}

function getFeedbacker(req, res) {
  appState.getFeedbacker(req.params.id).then((data) => {
    res.json(data.feedbacker);
  });
}

module.exports = {
  getFeedbackers,
  addFeedbacker,
  getFeedbacker,
  deleteFeedbacker,
  deleteFeedbackers,
};
