const admin = require('firebase-admin');
const config = require('config');

const serviceAccount = require(`./${config.firebaseToken}`); // eslint-disable-line import/no-dynamic-require

let db;

class AppState {
  constructor() {
    // set firebase reference variables
    this.fbRootRef = config.FirebaseDb;
    this.fbFeedbackerRef = 'feedbackers/';

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

    this.getFeedbacker(1).then((data) => {
      console.log('feedbacker-1:', data.feedbacker);
    });
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
            feedbackers: [],
          });
        }
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
}

module.exports = new AppState();
