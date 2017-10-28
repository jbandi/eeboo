const admin = require('firebase-admin');
const config = require('config');

const serviceAccount = require(`./${config.firebaseToken}`); // eslint-disable-line import/no-dynamic-require

let db;

class AppState {
  constructor() {
    // set firebase reference variables
    this.fbRootRef = config.FirebaseDb;
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

  getFeedbacker(id) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(`${this.fbFeedbackerRef}${id}`);
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

  addFeedbacker(data) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(`${this.fbFeedbackerRef}${data.id}`);
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
    const dbReference = db.ref(`${this.fbFeedbackerRef}${id}`);
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

  getQuestionaires() {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.fbQuestionaireRef);
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

  getQuestionaire(id) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(`${this.fbQuestionaireRef}${id}`);
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

  addQuestionaire(data) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(`${this.fbQuestionaireRef}${data.id}`);
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

  deleteQuestionaires() {
    const dbReference = db.ref(`${this.fbQuestionaireRef}`);
    return dbReference.set(null);
  }

  deleteQuestionaire(id) {
    const dbReference = db.ref(`${this.fbQuestionaireRef}${id}`);
    return dbReference.set(null);
  }

  getClient(id) {
    return new Promise(((resolve) => {
      const dbReference = db.ref(`${this.fbClientRef}${id}`);
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

  addClient(data) {
    return new Promise(((resolve, reject) => {
      if (data.id) {
        const dbReference = db.ref(`${this.fbClientRef}${data.id}`);
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

  deleteClient(id) {
    const dbReference = db.ref(`${this.fbClientRef}${id}`);
    return dbReference.set(null);
  }

  deleteClients() {
    const dbReference = db.ref(`${this.fbClientRef}`);
    return dbReference.set(null);
  }

  getClients() {
    return new Promise(((resolve) => {
      const dbReference = db.ref(this.fbClientRef);
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
}

module.exports = new AppState();
