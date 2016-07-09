const config = require("../config");
const User = require("../models/user.model").User;
const sendMail = require("../utilities/sendMail");
const utilities = require("../utilities");

const fieldsToReturn = "firstName lastName emailAddress confirmedEmail password";

module.exports.login = function(req, res) {
  const emailAddress = req.body.emailAddress.toLocaleLowerCase();
  const password = req.body.password;

  User.findOne({emailAddress: emailAddress}, fieldsToReturn)
    .exec()
    .then(function(user) {
      if (user) {
        if (user.password === password) {
          const responseObject = {};

          responseObject.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            confirmedEmail: user.confirmedEmail
          };

          responseObject.jwt = utilities.createToken(responseObject.user);

          res.status(200).send(responseObject);
        } else {
          res.status(401).send("Invalid credentials.");
        }
      } else {
        res.status(401).send("Invalid credentials.");
      }
    })
    .catch(function(response) {
      res.status(500).send(response);
    });
};

module.exports.register = function(req, res) {
  const user = new User({
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
      let message;

      switch (error.code) {
        case 11000:
          message = "A user with that email address already exists.";
          break;
        case 11001:
          message = "A user with that email address already exists.";
          break;
        default:
          message = "Unable to register user.";
      }

      res.status(422).send({message});
    });
};

module.exports.confirm = function(req, res) {

  const token = req.query.token;

  if (!token) {
    res.status(400).send({message: "A token is required"});
  }

  User.findOne({confirmationToken: token}).exec()
    .then(function(user) {
      if (!user) {
        res.status(400).send({message: "Token could not be validated."});
        return;
      }

      // Update
      user.confirmedEmail = true;
      user.save();

      // TODO Extract response to reusable function!!
      const responseObject = {};

      responseObject.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        confirmedEmail: user.confirmedEmail
      };

      responseObject.jwt = utilities.createToken(responseObject.user);

      res.status(200).send(responseObject);
    })
    .catch(function(error) {
      res.status(400).send(error);
    })
    .done();
};

module.exports.requireLogin = function(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    denyRequest(res);
  }

  utilities.validateToken(token, function(err, user) {
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

module.exports.validateToken = function(req, res) {
  const token = req.query.token;

  utilities.validateToken(token, function(err, user) {

    if (err) {
      res.status(500).send({message: "Token could not be validated"});
      return;
    }

    User.findOne({emailAddress: user.emailAddress}, fieldsToReturn).exec()
      .then(function(user) {
        if (!user) {
          res.status(401).send({message: "Token could not be validated"});
          return;
        }

        const responseObject = {};

        responseObject.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          confirmedEmail: user.confirmedEmail
        };

        responseObject.jwt = token;

        res.status(200).send(responseObject);
      })
      .catch(function(error) {
        res.status(401).send({message: error});
      });
  });
};

/**
 * Uniform 401 response function.
 * @param {object} response - ExpressJS response object.
 */
function denyRequest(response) {
  response.status(401).send({
    message: "Unable to verify authentication."
  });
}

