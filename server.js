const express = require('express');

const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const bodyParser = require('body-parser');

const dateFormat = require('dateformat');

const path = require('path');
const feedbacker = require('./controllers/routes/feedbacker');
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
// app.use(express.static(path.join(__dirname, 'web/build')));

app.route('/api/v1/company')
  .get(company.getCompany);

// TODO: remove this comment
// const feedbackers = [
//   {
//     id: 'sie8-19sk-119s-679b',
//     mail: 'mathu at example.com',
//     role: 1,
//     questionaire: '8as8-1s57-1uus-9s73',
//     answers: [{
//       question_id: 'xy',
//       score: 3,
//     }],
//   }, {
//     id: 'aaaa-bbbb-cccc-dddd',
//     mail: 'max at muster.com',
//     role: 2,
//     questionaire: '8as8-1s57-1uus-9s73',
//     answers: [{
//       question_id: 'xy',
//       score: 4,
//     }],
//   },
// ];
app.route('/api/v1/feedbackers')
  .get(feedbacker.getFeedbackers);

app.route('/api/v1/feedbackers/:id')
  .get(feedbacker.getFeedbacker);


// const checkScopes = jwtAuthz([ 'read:messages' ]);
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/web/build/index.html`));
  console.log('sending: ', path.join(`${__dirname}/web/build/index.html`));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`eeboo server listening on ${port}`);
