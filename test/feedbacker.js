// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const appState = require('../controllers/models/v1/app-state');

// Require the dev-dependencies
const chai = require('chai'); // eslint-disable-line
const chaiHttp = require('chai-http'); // eslint-disable-line
const server = require('../server');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);
// Our parent block
describe('Feedbackers', () => {
  beforeEach((done) => { // Before each test we empty the database
    appState.deleteFeedbackers().then(() => {
      appState.deleteProcs().then(() => {
        done();
      });
    });
  });

  const feedbacker1 = {
    id: '1',
    mail: 'mathu at example.com',
    role: 1,
    proc: 1,
    answers: {
      xy: { score: 3 },
    },
  };

  const proc = {
    id: 1,
    clients: {
      client1: { id: 'client1' },
      client2: { id: 'client2' },
    },
    questionaires: {
      questiooaire1: { id: 'questionaire1' },
      questionaire2: { id: 'questionaire2' },
    },
  };

  /*
  * Test the /GET route
  */
  describe('/GET feedbackers', () => {
    it('it should GET empty array if no feedbackers found', (done) => {
      chai.request(server)
        .get('/api/v1/feedbackers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST feedbacker', () => {
    it('it should not POST a Feedbacker without id field', (done) => {
      const feedbacker = {};
      chai.request(server)
        .post('/api/v1/feedbackers')
        .send(feedbacker)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Could not add Feedbacker with missing id');
          done();
        });
    });
    it('it should POST a Feedbacker with id field', (done) => {
      chai.request(server)
        .post('/api/v1/feedbackers')
        .send(feedbacker1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Feedbacker with id 1 added');
          done();
        });
    });
  });
  /*
  * Test the /GET route with content
  */
  describe('/GET feedbackers', () => {
    it('it should GET all the feedbackers', (done) => {
      appState.addFeedbacker({ id: '2', mail: 'mathu at example.com', proc: 1 }).then(() => {
        chai.request(server)
          .get('/api/v1/feedbackers')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  /*
  * Test /GET feedbackers by proc Id
  */
  describe('/GET feedbackers', () => {
    it('it should GET all the feedbackers by process Id', (done) => {
      appState.addFeedbacker({ id: '3', mail: 'test', proc: 1 }).then(() => {
        appState.addFeedbacker({ id: '4', mail: 'test2', proc: 2 }).then(() => {
          chai.request(server)
            .get('/api/v1/procs/2/feedbackers')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
        });
      });
    });
  });

  // TEST the /GET/:id for feedbacker
  describe('/GET/:id feedbacker', () => {
    it('it should GET a feedbacker by the given id', (done) => {
      appState.addFeedbacker(feedbacker1).then(() => {
        chai.request(server)
          .get(`/api/v1/feedbackers/${feedbacker1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('mail');
            res.body.should.have.property('answers');
            res.body.answers.should.be.a('object');
            res.body.answers.xy.should.be.a('object');
            res.body.answers.xy.should.have.property('score').eql(feedbacker1.answers.xy.score);
            done();
          });
      });
    });
  });
  // TEST the /GET/:id for single feedbacker
  describe('/GET/:id single feedbacker', () => {
    it('it should GET empty objects if feedbacker not found', (done) => {
      chai.request(server)
        .get(`/api/v1/singlefeedbacker/${feedbacker1.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('feedbacker').eql({});
          res.body.should.have.property('proc').eql({});
          done();
        });
    });

    it('it should GET empty proc if proc not found', (done) => {
      appState.addFeedbacker(feedbacker1).then(() => {
        chai.request(server)
          .get(`/api/v1/singlefeedbacker/${feedbacker1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.feedbacker.should.have.property('id').eql(feedbacker1.id);
            res.body.should.have.property('proc').eql({});
            done();
          });
      });
    });

    it('it should GET a single feedbacker by the given id', (done) => {
      appState.addFeedbacker(feedbacker1).then(() => {
        appState.addProc(proc).then(() => {
          chai.request(server)
            .get(`/api/v1/singlefeedbacker/${feedbacker1.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('feedbacker');
              res.body.should.have.property('proc');
              res.body.proc.should.be.a('object');
              res.body.feedbacker.should.be.a('object');
              res.body.feedbacker.should.have.property('id').eql(feedbacker1.id);
              res.body.proc.should.have.property('id').eql(proc.id);
              done();
            });
        });
      });
    });
  });
  // TEST the /DELETE/:id route
  describe('/DELETE/:id feedbacker', () => {
    it('it should GET a feedbacker by the given id', (done) => {
      appState.addFeedbacker(feedbacker1).then(() => {
        chai.request(server)
          .delete(`/api/v1/feedbackers/${feedbacker1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql(`Feedbacker ${feedbacker1.id} successfully deleted!`);
            done();
          });
      });
    });
  });
});
