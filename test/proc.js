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
describe('Procs', () => {
  beforeEach((done) => { // Before each test we empty the database
    appState.deleteProcs().then(() => {
      done();
    });
  });

  const proc1 = {
    id: '1',
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
  describe('/GET Procs', () => {
    it('it should GET empty array if no procs found', (done) => {
      chai.request(server)
        .get('/api/v1/procs')
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
  describe('/POST Proc', () => {
    it('it should not POST a proc without id field', (done) => {
      const proc = {};
      chai.request(server)
        .post('/api/v1/procs')
        .send(proc)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Could not add Process with missing id');
          done();
        });
    });
    it('it should POST a proc with id field', (done) => {
      chai.request(server)
        .post('/api/v1/procs')
        .send(proc1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Process with id 1 added');
          done();
        });
    });
  });
  /*
  * Test the /GET route with content
  */
  describe('/GET procs', () => {
    it('it should GET all the Procs', (done) => {
      appState.addProc(proc1).then(() => {
        chai.request(server)
          .get('/api/v1/procs')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });
  // TEST the /GET/:id route
  describe('/GET/:id Proc', () => {
    it('it should GET a proc by the given id', (done) => {
      appState.addProc(proc1).then(() => {
        chai.request(server)
          .get(`/api/v1/procs/${proc1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('questionaires');
            res.body.should.have.property('clients');
            //res.body.clients.client1.should.have.property('id').eql('client1');
            done();
          });
      });
    });
  });
  // TEST the /DELETE/:id route
  describe('/DELETE/:id proc', () => {
    it('it should GET a proc by the given id', (done) => {
      appState.addProc(proc1).then(() => {
        chai.request(server)
          .delete(`/api/v1/procs/${proc1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql(`Process ${proc1.id} successfully deleted!`);
            done();
          });
      });
    });
  });
});
