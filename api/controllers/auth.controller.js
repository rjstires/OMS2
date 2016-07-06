var jwt = require('jwt-simple');
var config = require('../config');
var _ = require('lodash');
var User = require('../models/user.model').User;
var sendMail = require('../utilities/sendMail');

var fieldsToReturn = 'firstName lastName emailAddress confirmedEmail password';

module.exports.login = function(req, res) {
  var emailAddress = req.body.emailAddress.toLocaleLowerCase();
  var password = req.body.password;

  User.findOne({emailAddress: emailAddress}, fieldsToReturn)
    .exec()
    .then(function(user) {
      if (user) {
        if (user.password === password) {
          var responseObject = {};

          responseObject.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            confirmedEmail: user.confirmedEmail
          };

          responseObject.jwt = createToken(responseObject.user);

          res.status(200).send(responseObject)
        } else {
          res.status(401).send('Invalid credentials.');
        }
      } else {
        res.status(401).send('Invalid credentials.');
      }
    })
    .catch(function(response) {
      res.status(500).send(response);
    });
};

module.exports.register = function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  });

  user.save()
    .then(function(user) {

      // Send email confirmation.
      sendMail.confirmAccount(
        `${user.firstName} ${user.lastName}`,
        user.emailAddress,
        `${config.paths.root}/confirm?token=${user.confirmationToken}`
      );

      // Send user token.
      res.status(200).send(user);
    })
    .catch(function(error) {
      var message;

      switch (error.code) {
        case 11000:
          message = 'A user with that email address already exists.';
          break;
        case 11001:
          message = 'A user with that email address already exists.';
          break;
        default:
          message = 'Unable to register user.';
      }

      res.status(422).send({message});
    });
};

module.exports.confirm = function(req, res) {

  var token = req.query.token;

  if (!token) {
    res.status(400).send({message: 'A token is required'});
  }

  User.findOne({confirmationToken: token}).exec()
    .then(function(user) {
      if (!user) {
        res.status(400).send({message: 'Token could not be validated.'});
        return;
      }

      // Update
      user.confirmedEmail = true;
      user.save();

      var responseObject = {};

      responseObject.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        confirmedEmail: user.confirmedEmail
      };

      responseObject.jwt = createToken(responseObject.user);

      res.status(200).send(responseObject);
    })
    .catch(function(error) {
      res.status(400).send(error);
    })
    .done();
};

module.exports.requireLogin = function(req, res, next) {
  var token = req.header('Authorization');

  if (!token) {
    denyRequest(res);
  }

  validateToken(token, function(err, user) {
    if (err) {
      denyRequest(res);
    }

    User.findById(user._id)
      .then(function(user) {
        if (user) {
          res.locals.token = token;
          res.locals.user = user;
          next();
        }
      })
      .catch(function(err) {
        next(err);
      });
  });
};

module.exports.validateToken = function(req, res, next) {
  var token = req.query.token;

  validateToken(token, function(err, user) {

    if (err) {
      res.status(500).send({message: 'Token could not be validated'});
      return;
    }

    User.findOne({emailAddress: user.emailAddress}, fieldsToReturn).exec()
      .then(function(user) {
        if (!user) {
          res.status(401).send({message: 'Token could not be validated'});
          return;
        }

        var responseObject = {};

        responseObject.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          confirmedEmail: user.confirmedEmail
        };

        responseObject.jwt = createToken(responseObject.user);

        res.status(200).send(responseObject);
      })
      .catch(function(error) {
        res.status(401).send({message: error});
      })
  })
};

/**
 * Uniform response including JWT token.
 * @param {object} response - ExpressJS response object.
 * @param {number} [status=200] - HTTP status code to respond with.
 * @param {User} user - The user object to be encoded with the JWT.
 */
function respondWithToken(response, status, user) {
  user = user || 200;
  response.status(status).send({token: createToken(user)});
}

/**
 * Uniform 401 response function.
 * @param {object} response - ExpressJS response object.
 */
function denyRequest(response) {
  response.status(401).send({
    message: 'Unable to verify authentication.'
  });
}

/**
 * Attempt to decode the JWT token using JWT-Simple
 * @param {string} token - Encoded JWT token.
 * @param {function} callback - Node style callback function.
 */
function validateToken(token, callback) {
  try {
    var decoded = jwt.decode(token, config.auth.secret);
    callback(null, decoded);
  } catch (e) {
    callback(e, null);
  }
}

/**
 * Encode the payload using JWT-Simple.
 * @param {object} params - Object which will extend the payload.
 * @return {String} - JWT encoded token.
 */
function createToken(params) {
  var payload = {
    iss: config.auth.issuer,
    aud: config.auth.audience
  };

  _.extend(payload, params);

  return jwt.encode(payload, config.auth.secret);
}