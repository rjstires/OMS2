var config = require('./config.js');
var mongoose = require('mongoose');

module.exports = function() {
  return mongoose.connect(config.db.link);
};
