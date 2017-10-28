const appState = require('./../models/v1/app-state.js');

function getProcs(req, res) {
  appState.getProcs().then((data) => {
    res.json(data.procs);
  });
}

function addProc(req, res) {
  appState.addProc(req.body).then((m) => {
    res.json({ message: m.message });
  }).catch((e) => {
    res.json({ message: e.message });
  });
}

function deleteProc(req, res) {
  appState.deleteProc(req.params.procid).then(() => {
    res.json({ message: `Process ${req.params.procid} successfully deleted!` });
  }).catch(() => {
    res.json({ message: `Could not delete Process with id ${req.params.procid}!` });
  });
}

function deleteProcs(req, res) {
  appState.deleteProcs().then(() => {
    res.json({ message: 'All Processes successfully deleted!' });
  }).catch(() => {
    res.json({ message: 'Could not delete all Processes!' });
  });
}

function getProc(req, res) {
  appState.getProc(req.params.procid).then((data) => {
    res.json(data.proc);
  });
}

module.exports = {
  getProcs,
  addProc,
  getProc,
  deleteProc,
  deleteProcs,
};
