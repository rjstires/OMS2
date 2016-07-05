var express = require('express');
var app = express();
require('./db')();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.use(bodyParser({extend: false}));

// Routes
var routes = require('./routes');
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
