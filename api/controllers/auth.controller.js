const config = require('../config');
const User = require('../models/user.model');
const sendMail = require('../utilities/sendMail');
const utilities = require('../utilities');

module.exports.login = function(req, res) {
  const emailAddress = req.body.emailAddress.toLocaleLowerCase();
  const password = req.body.password;

  User.login(emailAddress, password)
    .then(function(user) {
      res.status(200).send(createResponseObject(user.attributes));
    })
    .catch(function(response) {
      res.status(500).send(response);
    });
};

module.exports.register = function(req, res) {
  new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  }).save()
    .then(function(user) {
      const fullName = `${user.attributes.firstName} ${user.attributes.lastName}`;
      const emailAddress = user.attributes.emailAddress;
      const confirmationToken = user.attributes.confirmationToken;

      const confirmationURL = `${config.paths.root_url}/profile/?confirmAccount=${confirmationToken}`;
      sendMail.confirmAccount(fullName, emailAddress, confirmationURL);

      // Send user token.
      res.status(200).send(createResponseObject(user.attributes));
    })

    .catch(function(error) {
      res.status(422).send({message: error});
    });
};

module.exports.confirm = function(req, res) {
  const token = req.query.token;

  if (!token) {
    res.status(400).send({message: 'A token is required'});
  }

  User.confirmAccount(token)
    .then(function(user) {
      res.status(200).send(createResponseObject(user.attributes));
    })
    .catch(function(error) {
      res.status(400).send(error);
    });
};

/**
 * TODO Check user against database to ensure they're still valid.
 * @param req
 * @param res
 */
module.exports.validateToken = function(req, res) {
  const token = req.query.token;

  utilities.validateToken(token, function(err, user) {

    if (err) {
      res.status(500).send({message: 'Invalid token.', error: err});
      return;
    }

    new User({emailAddress: user.emailAddress}).fetch()
      .then(function(user) {
        if (!user) {
          res.status(401).send({message: 'Token could not be located.'});
          return;
        }

        res.status(200).send(createResponseObject(user.attributes));
      })
      .catch(function(error) {
        res.status(401).send({message: error});
      });
  });
};

function createResponseObject(user) {
  const responseObject = {};

  responseObject.user = {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    emailConfirmed: user.emailConfirmed
  };

  responseObject.jwt = utilities.createToken(responseObject.user);

  return responseObject;
}