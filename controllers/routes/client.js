const appState = require('./../models/v1/app-state.js');
const parser = require('./../models/v1/csvParser.js');

function getClients(req, res) {
  appState.getClients(req.params.procid).then((data) => {
    res.json(data.clients);
  });
}

function addClient(req, res) {
  appState.addClient(req.body, req.params.procid).then((m) => {
    res.json({ message: m.message });
  }).catch((e) => {
    res.json({ message: e.message });
  });
}

function deleteClient(req, res) {
  appState.deleteClient(req.params.procid, req.params.clientid).then(() => {
    res.json({ message: `Client ${req.params.clientid} successfully deleted!` });
  }).catch(() => {
    res.json({ message: `Could not delete Client with id ${req.params.id}!` });
  });
}

function deleteClients(req, res) {
  appState.deleteClients(req.params.procid).then(() => {
    res.json({ message: 'All Clients successfully deleted!' });
  }).catch(() => {
    res.json({ message: 'Could not delete all Clients!' });
  });
}

function getClient(req, res) {
  appState.getClient(req.params.procid, req.params.clientid).then((data) => {
    res.json(data.client);
  });
}

function uploadClients(req, res) {
  parser.parseClient(req.body)
    .then((clients) => {
      appState.addCSVClient(clients, req.params.procid).then((data) => {
        res.json(data);
      }).catch(() => {
        res.json({ message: 'Could not add clients to database' });
      });
    })
    .catch((e) => {
      res.json(({ message: 'Could not import clients', error: e.message }));
    });
}

module.exports = {
  getClients,
  addClient,
  getClient,
  deleteClient,
  deleteClients,
  uploadClients,
};
