// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const appState = require('../controllers/models/v1/app-state');

// Require the dev-dependencies
const chai = require('chai'); // eslint-disable-line node/no-unpublished-require
const chaiHttp = require('chai-http'); // eslint-disable-line node/no-unpublished-require
const server = require('../server');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);
// Our parent block
describe('Questionaires', () => {
  beforeEach((done) => { // Before each test we empty the database
    appState.deleteQuestionaires().then(() => {
      done();
    });
  });

  const questionaire = {
    contexts: [null, {
      contents: [{
        content: 'Konfliktfähigkeit',
        lan: 'de',
      }, {
        content: 'ability to manage conflicts',
        lan: 'en',
      }],
    }, {
      contents: [{
        content: 'Teamfähigkeit',
        lan: 'de',
      }, {
        content: 'ability to work in team',
        lan: 'en',
      }],
    }],
    id: 1234,
    questions: {
      question1: {
        contents: [{
          content: 'Frage1 für Rolle1 im Kontext1',
          lan: 'de',
          role: 1,
        }, {
          content: 'Frage 1 für Rolle2 im Kontext1',
          lan: 'de',
          role: 2,
        }, {
          content: 'quetsion1 for role1 in context1',
          lan: 'en',
          role: 1,
        }, {
          content: 'question1 for role2 in context1',
          lan: 'en',
          role: 2,
        }],
        context: 1,
        id: 'question1',
        scores: 5,
      },
      question2: {
        contents: [{
          content: 'Frage2 für Rolle1 im Kontext1',
          lan: 'de',
          role: 1,
        }, {
          content: 'Frage2 für Rolle2 im Kontext2',
          lan: 'de',
          role: 2,
        }, {
          content: 'quetsion2 for role1 in context1',
          lan: 'en',
          role: 1,
        }, {
          content: 'question2 for role2 in context1',
          lan: 'en',
          role: 2,
        }],
        context: 1,
        id: 'question2',
        score: 4,
      },
      question3: {
        contents: [{
          content: 'Frage3 für Rolle1 im Kontext2',
          lan: 'de',
          role: 1,
        }, {
          content: 'Frage3 für Rolle2 im Kontext2',
          lan: 'de',
          role: 2,
        }, {
          content: 'question3 for role1 in context2',
          lan: 'en',
          role: 1,
        }, {
          content: 'question 3 for role2 in context2',
          lan: 'en',
          role: 2,
        }],
        context: 2,
        id: 'question3',
        score: 5,
      },
    },
    roles: [null, {
      contents: [{
        content: 'Teamleiter',
        lan: 'de',
      }, {
        content: 'teamlead',
        lan: 'en',
      }],
    }, {
      contents: [{
        content: 'Arbeitskollege',
        lan: 'de',
      }, {
        content: 'colleague',
        lan: 'en',
      }],
    }],
  };

  /*
  * Test the /GET route
  */
  describe('/GET questionaires', () => {
    it('it should GET all the questionaire ids', (done) => {
      chai.request(server)
        .get('/api/v1/procs/1/questionaires')
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
  describe('/POST questionaire', () => {
    it('it should not POST a questionaire without id field', (done) => {
      const qEmpty = {};
      chai.request(server)
        .post('/api/v1/procs/1/questionaires')
        .send(qEmpty)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Could not add Questionaire with missing id');
          done();
        });
    });
    it('it should POST a questionaire with id field', (done) => {
      chai.request(server)
        .post('/api/v1/procs/1/questionaires')
        .send(questionaire)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Questionaire with id ${questionaire.id} added`);
          done();
        });
    });
  });
  // TEST the /GET/:id route
  describe('/GET/:id questionaire', () => {
    it('it should GET a questionaire by the given id', (done) => {
      appState.addQuestionaire(questionaire).then(() => {
        chai.request(server)
          .get(`/api/v1/procs/1/questionaires/${questionaire.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('contexts');
            res.body.should.have.property('questions');
            res.body.should.have.property('roles');
            res.body.roles.should.be.a('array');
            res.body.roles[1].contents[0].should.have.property('content').eql('Teamleiter');
            done();
          });
      });
    });
  });
});
