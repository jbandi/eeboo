const appState = require('./../models/v1/app-state.js');

function getClients(req, res) {
  appState.getClients().then((data) => {
    res.json(data.clients);
  });
}

function addClient(req, res) {
  appState.addClient(req.body).then((m) => {
    res.json({ message: m.message });
  }).catch((e) => {
    res.json({ message: e.message });
  });
}

function deleteClient(req, res) {
  appState.deleteClient(req.params.id).then(() => {
    res.json({ message: `Client ${req.params.id} successfully deleted!` });
  }).catch(() => {
    res.json({ message: `Could not delete Client with id ${req.params.id}!` });
  });
}

function deleteClients(req, res) {
  appState.deleteClients().then(() => {
    res.json({ message: 'All Clients successfully deleted!' });
  }).catch(() => {
    res.json({ message: 'Could not delete all Clients!' });
  });
}

function getClient(req, res) {
  appState.getClient(req.params.id).then((data) => {
    res.json(data.client);
  });
}

module.exports = {
  getClients,
  addClient,
  getClient,
  deleteClient,
  deleteClients,
};
