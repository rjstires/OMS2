const mongoose = require("mongoose");
const utilities = require("../utilities/index");
const Schema = mongoose.Schema;

// Validations
const namePattern = /^[a-z ,.'-]+$/i;
const emailPattern = /\S+@\S+\.\S+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])[A-Za-z\d$@!%*?&]{8,22}/; // eslint-disable-line max-len

// Error messages
mongoose.Error.messages.String.required = "{PATH} must be set.";

const userContactSchema = new Schema({
  contactType: String,
  value: String
});

const userSchema = new Schema({
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
  forgotPasswordToken: {type: String},
  contacts: [userContactSchema]
});

userSchema.pre("save", function(next) {
  this.confirmationToken = this.confirmationToken || utilities.stringGen(40);
  next();
});

userSchema.methods.generateForgotPasswordToken = function() {
  this.forgotPasswordToken = utilities.createToken({exp: (new Date().getTime() + 60 * 60 * 24), email: this.emailAddress});
  this.save();
};

module.exports.UserContact = mongoose.model("UserContact", userContactSchema);
module.exports.User = mongoose.model("User", userSchema);
