const admin = require('firebase-admin');
const config = require('config');
const idx = require('idx');

const serviceAccount = require(`./${config.firebaseToken}`); // eslint-disable-line import/no-dynamic-require

let db;

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

    // Callback when firebase data arrives
    // this.getFeedbackers().then((d) => {
    //   this.feedbackers = d.feedbackers;
    //   console.log('Done loading feedbackers. Server is now ready to use.');
    //   console.log(this.feedbackers);
    // });
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
        const dbReference = db.ref(this.feedbackerPathById(data.id));
        dbReference.set(data).then(() => {
          resolve({
            message: `Feedbacker with id ${data.id} added`,
          });
        }).catch(() => {
          reject(new Error(`Could not add Feedbacker with id ${data.id}`));
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
        const dbReference = db.ref(this.clientPathById(procId, data.id));
        dbReference.set(data).then(() => {
          resolve({
            message: `Client with id ${data.id} added`,
          });
        }).catch(() => {
          reject(new Error(`Could not add Client with id ${data.id}`));
        });
      } else {
        reject(new Error('Could not add Client with missing id'));
      }
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
          const procs = Object.keys(fbProcs);
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
