const express = require('express');
const app = express();
require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const routes = require('./routes');
app.use(routes);

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
  }
});

app.listen(4000, function() {
  console.log('API server running on port 4000');
});
