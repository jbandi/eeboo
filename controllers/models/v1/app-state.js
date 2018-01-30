const admin = require('firebase-admin');
const config = require('config');
const idx = require('idx');

let db;

// get Firbase access data from a JSON token
// either load a base64 encoded token from the evironment variable FB_TOKEN
// or get it in JSON form a from a configuration file
const getFBAccount = () => {
  let fbToken = '';
  if (process.env.FB_TOKEN) {
    // if a firebase token can be found in an environment variable, use it
    return JSON.parse(Buffer.from(process.env.FB_TOKEN, 'base64').toString());
  }
  try {
    fbToken = require(`./${config.firebaseToken}`); // eslint-disable-line
  } catch (e) {
    console.info('firebase token not found in config dir'); // eslint-disable-line no-console
  }
  if (fbToken && fbToken !== '') {
    // if a firbase token can be found in a config file, use it
    return fbToken;
  }
  console.error('firebase token not found, check your environment variables'); // eslint-disable-line no-console
  process.exit(1);
};

const getFBUrl = () => (
  (!process.env.FB_URL) ? config.firebaseUrl : process.env.FB_URL
);

class AppState {
  constructor() {
    const fbToken = getFBAccount();
    // set firebase reference variables
    this.fbRootRef = fbToken.project_id;
    this.fbProcRef = 'procs/';
    this.fbFeedbackerRef = 'feedbackers/';
    this.fbQuestionaireRef = 'questionaires/';
    this.fbClientRef = 'clients/';

    // Setup firebase for persistent storage
    admin.initializeApp({
      credential: admin.credential.cert(fbToken),
      databaseURL: getFBUrl(),
    });

    db = admin.database();
    console.log('Connected to database. Now reading data'); // eslint-disable-line no-console

    // const encoded = Buffer.from(JSON.stringify(getFBAccount())).toString('base64');
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
          const procId = idx(feedbacker, _ => _.proc) || undefined;
          if (procId) {
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
      console.log('deleteing', client.id); // eslint-disable-line no-console
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
        const ref = db.ref(this.clientPathById(procId, data.id));
        ref.set(data).then(() => {
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
