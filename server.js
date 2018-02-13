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

// authentication middleware
const checkJwt = (process.env.NODE_ENV !== 'production')
  ? (req, res, next) => {
    console.log('not in production environment, skip JWT'); // eslint-disable-line no-console
    return next();
  }
  : jwt({
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
app.use('/api', bodyParser.json());
app.use('/api/', bodyParser.urlencoded({ extended: true }));
app.use('/api', bodyParser.text());
app.use('/api', bodyParser.json({ type: 'application/json' }));

const logger = (req, res, next) => {
  const { method, url } = req;
  console.log(dateFormat(new Date(), 'isoDateTime'), method, url); // eslint-disable-line no-console
  next(); // Passing the request to the next handler in the stack.
};
app.use(logger);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'web/build')));

app.route('/api/v1/procs')
  .get(checkJwt, proc.getProcs)
  .delete(checkJwt, proc.deleteProc)
  .post(checkJwt, proc.addProc);

app.route('/api/v1/procs/:procid')
  .get(checkJwt, proc.getProc)
  .delete(checkJwt, proc.deleteProc);

app.route('/api/v1/feedbackers')
  .get(checkJwt, feedbacker.getFeedbackers)
  .delete(checkJwt, feedbacker.deleteFeedbackers)
  .post(checkJwt, feedbacker.addFeedbacker);

app.route('/api/v1/feedbackers/:feedbackerid')
  .get(feedbacker.getFeedbacker)
  .delete(feedbacker.deleteFeedbacker);

app.route('/api/v1/singlefeedbacker/:feedbackerid')
  .get(feedbacker.getSingleFeedbacker);

app.route('/api/v1/procs/:procid/feedbackers')
  .get(checkJwt, feedbacker.getFeedbackerByProcId);

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/web/build/index.html`));
  console.log('sending: ', path.join(`${__dirname}/web/build/index.html`)); // eslint-disable-line no-console
});

app.use('/test-coverage', express.static('coverage'));

const port = process.env.PORT || 3001;
const server = app.listen(port);

module.exports = server;

console.log(`eeboo server listening on ${port}`); // eslint-disable-line no-console
