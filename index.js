const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'web/build')));

// Put all API endpoints under '/api'
app.get('/api/users', (req, res) => {
  res.json([{
      id: 1,
      username: "samsepi0l"
  }, {
      id: 2,
      username: "D0loresH4ze"
  }]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/web/build/index.html'));
  console.log('sending: ',path.join(__dirname+'/web/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`analyzeyou server listening on ${port}`);
