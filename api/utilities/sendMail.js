var config = require('../config');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('5RfVJQ-d5MZ7iP93pg4E6Q');

var defaultMessageParams = {
  from_email: "noreply@boostingedge.com",
  from_name: "Jarvis Dredsen"
};

/**
 * Send a new user email.
 * @param {string} name - Name of the client.
 * @param {string} emailAddress - Email address of the client.
 * @param {string} confirmationURL - Full URL to confirmation end-point.
 * @returns {Promise}
 */
var confirmAccount = function(name, emailAddress, confirmationURL) {
  var params = {};
  params.template_name = 'new_user_registration';

  params.template_content = [];

  params.message = Object.assign({}, defaultMessageParams, {

    subject: "Welcome to Boosting Edge, LLC",

    to: [{
      email: emailAddress
    }],

    merge_vars: [{
      rcpt: emailAddress,
      vars: [
        {name: 'USER_NAME', content: name},
        {name: 'CONFIRMATION_URL', content: confirmationURL}
      ]
    }]
  });

  // Log in database that email was sent.
  // Setup a webhook callback for confirmation?
  return new Promise(function(resolve, reject) {
    mandrill_client.messages.sendTemplate(params, function(result) {
      resolve(result);
    }, function(error) {
      reject(error);
    });
  });
};

module.exports = {
  confirmAccount
};
