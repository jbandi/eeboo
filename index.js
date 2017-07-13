const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const path = require('path');

// authentication middleware
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://eeboo.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  //audience: 'https://eboo.herokuapp.com',
  audience: 'https://eboo.herokuapp.com',
  issuer: `https://eeboo.eu.auth0.com/`,
  algorithms: ['RS256']
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'web/build')));

// Put all API endpoints under '/api'
app.get('/api/users', (req, res) => {
  res.json([{
      id: 1,
      username: "iam"
  }, {
      id: 2,
      username: "seeyousoon"
  }]);
});

// const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/web/build/index.html'));
  console.log('sending: ',path.join(__dirname+'/web/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`eeboo server listening on ${port}`);
