const admin = require('firebase-admin');

let db;

class AppState {
  constructor() {
    // set firebase reference variables
    this.fbRootRef = 'eeboo-skillsgarden-001';
    this.fbFeedbackerRef = 'feedbackers/';

    // Setup firebase for persistent storage
    admin.initializeApp({
      credential: admin.credential.cert('./conf/eeboo-skillsgarden-7d4f7ef51c72.json'),
      databaseURL: 'https://eeboo-skillsgarden-001.firebaseio.com',
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
          console.log('empty');
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
          console.log('empty');
          resolve({
            feedbackers: [],
          });
        }
      });
    }));
  }
}

module.exports = new AppState();
