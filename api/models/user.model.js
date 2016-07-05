var mongoose = require('mongoose');
var utilities = require('../utilities/index');
var Schema = mongoose.Schema;

// Validations
var namePattern = /^[a-z ,.'-]+$/i;
var emailPattern = /\S+@\S+\.\S+/;
var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,22}/; // eslint-disable-line max-len

// Error messages
mongoose.Error.messages.String.required = '{PATH} must be set.';

var userContactSchema = new Schema({
  contactType: String,
  value: String
});

var userSchema = new Schema({
  firstName: {type: String, required: true, match: namePattern},
  lastName: {type: String, required: true, match: namePattern},
  emailAddress: {
    type: String,
    required: true,
    match: emailPattern,
    unique: true,
    dropDups: true,
    lowercase: true
  },
  password: {type: String, required: true, match: passwordPattern},
  createdOn: {type: Date, default: Date.now()},
  confirmedEmail: {type: Boolean, default: false},
  confirmationToken: {type: String},
  contacts: [userContactSchema]
});

userSchema.pre('save', function(next) {
  this.confirmationToken = this.confirmationToken || utilities.stringGen(40);
  next();
});

module.exports.UserContact = mongoose.model('UserContact', userContactSchema);
module.exports.User = mongoose.model('User', userSchema);
