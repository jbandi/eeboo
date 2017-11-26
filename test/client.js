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
describe('Clients', () => {
  beforeEach((done) => { // Before each test we empty the database
    appState.deleteClients().then(() => {
      appState.deleteFeedbackers().then(() => {
        done();
      });
    });
  });

  const client1 = {
    id: '1',
    mail: 'mathu at example.com',
    questionaire: '8as8-1s57-1uus-9s73',
    feedbackers: [1, 2],
  };

  /*
  * Test the /GET route
  */
  describe('/GET Clients', () => {
    it('it should GET empty array if no clients found', (done) => {
      chai.request(server)
        .get('/api/v1/procs/1/clients')
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
  describe('/POST Client', () => {
    it('it should not POST a client without id field', (done) => {
      const client = {};
      chai.request(server)
        .post('/api/v1/procs/1/clients')
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Could not add Client with missing id');
          done();
        });
    });
    it('it should POST a client with id field', (done) => {
      chai.request(server)
        .post('/api/v1/procs/1/clients')
        .send(client1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Client with id 1 added');
          done();
        });
    });
  });
  /*
  * Test the /GET route with content
  */
  describe('/GET clients', () => {
    it('it should GET all the Clients', (done) => {
      appState.addClient(client1).then(() => {
        chai.request(server)
          .get('/api/v1/procs/1/clients')
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
  describe('/GET/:id Client', () => {
    it('it should GET a client by the given id', (done) => {
      appState.addClient(client1).then(() => {
        chai.request(server)
          .get(`/api/v1/procs/1/clients/${client1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('mail');
            res.body.should.have.property('feedbackers');
            res.body.feedbackers.should.be.a('array');
            res.body.feedbackers.length.should.be.eql(2);
            done();
          });
      });
    });
  });
  // TEST the /DELETE/:id route
  describe('/DELETE/:id client', () => {
    it('it should GET a client by the given id', (done) => {
      appState.addClient(client1).then(() => {
        chai.request(server)
          .delete(`/api/v1/procs/1/clients/${client1.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql(`Client ${client1.id} successfully deleted!`);
            done();
          });
      });
    });
  });

  describe('/POST CSV Client List', () => {
    it('it should POST CSV List of Clients', (done) => {
      const csv = 'Name,Vorname,Geschlecht,Mail,ID,\nPaul,Muster,m,p.muster@example.com,,m\nHeinz,Müller,m,h.mueller@example.com,,w\nSusi,Bigler,m,s.bigler@example.com,,';
      chai.request(server)
        .post('/api/v1/procs/1/csvclients')
        .set('content-type', 'text/csv')
        .send(csv)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Clients and Feedbackers to process 1 added');
          res.body.should.have.property('data');
          res.body.should.have.property('feedbackers');
          done();
        });
    });
    it('it should not POST CSV List of Clients if CSV as an error', (done) => {
      const corrupt = 'Name,Vorname,Geschlecht,Mail,ID,\nPaul,Muster,p.muster@example.com,,m\nHeinz,Müller,m,h.mueller@example.com,,w\nSusi,Bigler,m,s.bigler@example.com,,';
      chai.request(server)
        .post('/api/v1/procs/1/csvclients')
        .set('content-type', 'text/csv')
        .send(corrupt)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Could not import clients');
          done();
        });
    });
  });
});
