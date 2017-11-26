const admin = require('firebase-admin');
const config = require('config');
const idx = require('idx');
const uuidv4 = require('uuid');

const serviceAccount = require(`./${config.firebaseToken}`); // eslint-disable-line import/no-dynamic-require

let db;

// add new feedbackers asynchronously
async function addFeedbackers(clients, procId, appState) {
  const clientIds = Object.keys(clients);
  const feedbackers = [];
  for (let id of clientIds) { // eslint-disable-line
    const feedbacker = {
      id: uuidv4(),
      mail: clients[id].mail,
      clients: {
        id: {
          id,
          role: 'self',
        },
      },
      proc: procId,
    };
    await appState.addFeedbacker(feedbacker); // eslint-disable-line no-await-in-loop
    feedbackers.push(feedbacker);
  }
  return feedbackers;
}

class AppState {
  constructor() {
    // set firebase reference variables
    this.fbRootRef = config.FirebaseDb;
    this.fbProcRef = 'procs/';
    this.fbFeedbackerRef = 'feedbackers/';
    this.fbQuestionaireRef = 'questionaires/';
    this.fbClientRef = 'clients/';

    // Setup firebase for persistent storage
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: config.firebaseUrl,
    });

    db = admin.database();
    console.log('Connected to database. Now reading data');
  }

  feedbackerPathById(id) {
    return `${this.fbFeedbackerRef}${id}`;
  }

  feedbackerPath() {
    return `${this.fbFeedbackerRef}`;
  }

  clientPathById(procid, clientId) {
    return `${this.fbProcRef}${procid}/${this.fbClientRef}${clientId}`;
  }

  clientPath(procid) {
    return `${this.fbProcRef}${procid}/${this.fbClientRef}`;
  }

  questionairePathById(procid, questionaireId) {
    return `${this.fbProcRef}${procid}/${this.fbQuestionaireRef}${questionaireId}`;
  }

  questionairePath(procid) {
    return `${this.fbProcRef}${procid}/${this.fbQuestionaireRef}`;
  }

  getFeedbackerByProcId(procId) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.fbFeedbackerRef);
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const fbFeedbackers = dbSnapshot || [];
          // map firebase json list to array
          const feedbackers = Object.keys(fbFeedbackers)
            .map(k => fbFeedbackers[k])
            .filter(f => f.proc.toString() === procId);
          resolve({
            feedbackers,
          });
        } else {
          // first initialization
          resolve({
            feedbackers: [],
          });
        }
      });
    }));
  }

  getFeedbacker(id) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.feedbackerPathById(id));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const feedbacker = dbSnapshot || [];
          resolve({
            feedbacker,
          });
        } else {
          // first initialization
          resolve({
            feedbacker: {},
          });
        }
      });
    }));
  }

  getSingleFeedbacker(id) {
    return new Promise(((resolve, reject) => {
      const dbReference = db.ref(this.feedbackerPathById(id));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const feedbacker = dbSnapshot || [];
          const procId = idx(feedbacker, _ => _.proc) || -1;
          if (procId > -1) {
            this.getProc(procId).then((proc) => {
              resolve({
                feedbacker,
                proc: proc.proc,
              });
            });
          } else {
            reject(new Error(`Could not get data for single Feedbacker with id ${id}`));
          }
        } else {
          // first initialization
          resolve({
            feedbacker: {},
            proc: {},
          });
        }
      });
    }));
  }

  addFeedbacker(data) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        // check if a feedbacker with a specific mail already exists
        const dbReference = db.ref('/');
        dbReference.child('feedbackers').orderByChild('mail').equalTo(data.mail).once('value', (snapshot) => {
          const userData = snapshot.val();
          if (!userData) {
            // if no feedbacker with the given mail exists -> add it
            const ref = db.ref(this.feedbackerPathById(data.id));
            ref.set(data).then(() => {
              resolve({
                message: `Feedbacker with id ${data.id} added`,
              });
            }).catch(() => {
              reject(new Error(`Could not add Feedbacker with id ${data.id}`));
            });
          } else {
            resolve({
              message: `Feedbacker with id ${data.id} not added because it exists`,
            });
          }
        });
      } else {
        reject(new Error('Could not add Feedbacker with missing id'));
      }
    }));
  }

  deleteFeedbacker(id) {
    const dbReference = db.ref(this.feedbackerPathById(id));
    return dbReference.set(null);
  }

  deleteFeedbackers() {
    const dbReference = db.ref(`${this.fbFeedbackerRef}`);
    return dbReference.set(null);
  }

  // delete a list of feedbackers belonging to a Process
  async deleteFeedbackerfromList(list) {
    for (let client of list) { // eslint-disable-line
      console.log('deleteing', client.id);
      await this.deleteFeedbacker(client.id); // eslint-disable-line no-await-in-loop
    }
  }

  // delete all feedbackers for a gievn process
  deleteFeedbackersByProc(procId) {
    return new Promise(((resolve) => {
      this.getFeedbackerByProcId(procId).then((list) => {
        const arr = list.feedbackers;
        this.deleteFeedbackerfromList(arr).then(() => {
          resolve();
        });
      });
    }));
  }

  getFeedbackers() {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.fbFeedbackerRef);
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const fbFeedbackers = dbSnapshot || [];
          // map firebase json list to array
          const feedbackers = Object.keys(fbFeedbackers).map(k => fbFeedbackers[k]);
          resolve({
            feedbackers,
          });
        } else {
          // first initialization
          resolve({
            feedbackers: [],
          });
        }
      });
    }));
  }

  getQuestionaires(procId) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.questionairePath(procId));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const fbQuestionaires = dbSnapshot || [];
          // map firebase json list to array
          const questionaires = Object.keys(fbQuestionaires);
          resolve({
            questionaires,
          });
        } else {
          // first initialization
          resolve({
            questionaires: [],
          });
        }
      });
    }));
  }

  getQuestionaire(procId, questionaireId) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.questionairePathById(procId, questionaireId));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const questionaire = dbSnapshot || [];
          resolve({
            questionaire,
          });
        } else {
          // first initialization
          resolve({
            questionaire: {},
          });
        }
      });
    }));
  }

  addQuestionaire(data, procId) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(this.questionairePathById(procId, data.id));
        dbReference.set(data).then(() => {
          resolve({
            message: `Questionaire with id ${data.id} added`,
          });
        }).catch(() => {
          reject(new Error(`Could not add Questionaire with id ${data.id}`));
        });
      } else {
        reject(new Error('Could not add Questionaire with missing id'));
      }
    }));
  }

  deleteQuestionaires(procId) {
    const dbReference = db.ref(this.questionairePath(procId));
    return dbReference.set(null);
  }

  deleteQuestionaire(procId, questionaireId) {
    const dbReference = db.ref(this.questionairePathById(procId, questionaireId));
    return dbReference.set(null);
  }

  getClient(procId, clientId) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.clientPathById(procId, clientId));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const client = dbSnapshot || [];
          resolve({
            client,
          });
        } else {
          // first initialization
          resolve({
            client: {},
          });
        }
      });
    }));
  }

  addClient(data, procId) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(`procs/${procId}`);
        dbReference.child('clients').orderByChild('mail').equalTo(data.mail).once('value', (snapshot) => {
          const userData = snapshot.val();
          if (!userData) {
            const ref = db.ref(this.clientPathById(procId, data.id));
            ref.set(data).then(() => {
              resolve({
                message: `Client with id ${data.id} added`,
              });
            }).catch(() => {
              reject(new Error(`Could not add Client with id ${data.id}`));
            });
          } else {
            resolve({
              message: `Client with id ${data.id} not added because it exists`,
            });
          }
        });
      } else {
        reject(new Error('Could not add Client with missing id'));
      }
    }));
  }

  // replace all Clients
  // create a new feedbacker for every client with role="self"
  addCSVClient(data, procId) {
    return new Promise(((resolve, reject) => {
      const dbReference = db.ref(this.clientPath(procId));
      dbReference.set(data).then(() => {
        this.deleteFeedbackersByProc(procId).then(() => {
          addFeedbackers(data, procId, this).then((feedbackers) => {
            resolve({
              message: `Clients and Feedbackers to process ${procId} added`,
              data,
              feedbackers,
            });
          });
        });
      }).catch(() => {
        reject(new Error(`Could not add clients to process ${procId}`));
      });
    }));
  }

  deleteClient(procId, clientId) {
    const dbReference = db.ref(this.clientPathById(procId, clientId));
    return dbReference.set(null);
  }

  deleteClients(procId) {
    const dbReference = db.ref(this.clientPath(procId));
    return dbReference.set(null);
  }

  getClients(procId) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.clientPath(procId));
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const fbClients = dbSnapshot || [];
          // map firebase json list to array
          const clients = Object.keys(fbClients);
          resolve({
            clients,
          });
        } else {
          // first initialization
          resolve({
            clients: [],
          });
        }
      });
    }));
  }

  // Processes
  getProc(id) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(`${this.fbProcRef}${id}`);
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const proc = dbSnapshot || [];
          resolve({
            proc,
          });
        } else {
          // first initialization
          resolve({
            proc: {},
          });
        }
      });
    }));
  }

  addProc(data) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(`${this.fbProcRef}${data.id}`);
        dbReference.set(data).then(() => {
          resolve({
            message: `Process with id ${data.id} added`,
          });
        }).catch(() => {
          reject(new Error(`Could not add Process with id ${data.id}`));
        });
      } else {
        reject(new Error('Could not add Process with missing id'));
      }
    }));
  }

  deleteProc(id) {
    const dbReference = db.ref(`${this.fbProcRef}${id}`);
    return dbReference.set(null);
  }

  deleteProcs() {
    const dbReference = db.ref(`${this.fbProcRef}`);
    return dbReference.set(null);
  }

  getProcs() {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.fbProcRef);
      dbReference.once('value').then((snapshot) => {
        dbReference.off('value');
        const dbSnapshot = snapshot.val();
        if (dbSnapshot) {
          const fbProcs = dbSnapshot || [];
          // map firebase json list to array
          const procs = Object.keys(fbProcs).map(k => fbProcs[k]);
          resolve({
            procs,
          });
        } else {
          // first initialization
          resolve({
            procs: [],
          });
        }
      });
    }));
  }
}

module.exports = new AppState();
