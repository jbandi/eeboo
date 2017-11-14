const express = require('express');

const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');

const dateFormat = require('dateformat');

const path = require('path');
const proc = require('./controllers/routes/process');
const feedbacker = require('./controllers/routes/feedbacker');
const questionaire = require('./controllers/routes/questionaire');
const client = require('./controllers/routes/client');
const company = require('./controllers/routes/company');

// Setup firebase backend
// const appState = require('./controllers/models/v1/app-state.js');

// authentication middleware
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://eeboo.eu.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  // audience: 'https://eboo.herokuapp.com',
  audience: 'https://eboo.herokuapp.com',
  issuer: 'https://eeboo.eu.auth0.com/',
  algorithms: ['RS256'],
});

// parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

const logger = (req, res, next) => {
  const { method, url } = req;
  console.log(dateFormat(new Date(), 'isoDateTime'), method, url);
  next(); // Passing the request to the next handler in the stack.
};
app.use(logger);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'web/build')));

app.route('/api/v1/company')
  .get(company.getCompany);

app.route('/api/v1/procs')
  .get(proc.getProcs)
  .delete(proc.deleteProc)
  .post(proc.addProc);

app.route('/api/v1/procs/:procid')
  .get(proc.getProc)
  .delete(proc.deleteProc);

app.route('/api/v1/feedbackers')
  .get(feedbacker.getFeedbackers)
  .delete(feedbacker.deleteFeedbackers)
  .post(feedbacker.addFeedbacker);

app.route('/api/v1/feedbackers/:feedbackerid')
  .get(feedbacker.getFeedbacker)
  .delete(feedbacker.deleteFeedbacker);

app.route('/api/v1/singlefeedbacker/:feedbackerid')
  .get(feedbacker.getSingleFeedbacker);

app.route('/api/v1/procs/:procid/feedbackers')
  .get(feedbacker.getFeedbackerByProcId);

app.route('/api/v1/procs/:procid/questionaires')
  .get(questionaire.getQuestionaires)
  .delete(questionaire.deleteQuestionaires)
  .post(questionaire.addQuestionaire);

app.route('/api/v1/procs/:procid/questionaires/:questionaireid')
  .get(questionaire.getQuestionaire)
  .delete(questionaire.deleteQuestionaire);

app.route('/api/v1/procs/:procid/clients')
  .get(client.getClients)
  .delete(client.deleteClients)
  .post(client.addClient);

app.route('/api/v1/procs/:procid/clients/:clientid')
  .get(client.getClient)
  .delete(client.deleteClient);


// const checkScopes = jwtAuthz([ 'read:messages' ]);
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/web/build/index.html`));
  console.log('sending: ', path.join(`${__dirname}/web/build/index.html`));
});

app.use('/test-coverage', express.static('coverage'));

const port = process.env.PORT || 3001;
const server = app.listen(port);

module.exports = server;

console.log(`eeboo server listening on ${port}`);
