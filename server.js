const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Database inclusion
require('./server/db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routes = require('./server/routes');

app.use(routes);

app.use(express.static('dist'));

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
  }
});

app.listen(3000, function() {
  console.log('API server running on port 3000');
});
