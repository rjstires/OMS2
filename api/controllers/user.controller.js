var User = require("../models/user.model").User;
var _ = require("lodash");

var messages = {
  emptyTable: "There are no users.",
  unableToLocate: "Unable to locate user.",
  userDeleted: function(user) {
    return user + " has been deleted";
  }
};

module.exports.create = function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    password: req.body.password
  });

  user.save()
    .then(function(user) {
      res.status(201).send(user);
    })
    .catch(function(error) {
      res.status(400).send(error);
    });
};

module.exports.list = function(req, res) {
  User.find({})
    .sort({lastName: "desc", firstName: "desc"})
    .exec()
    .then(function(users) {
      if (users) {
        res.status(200).send(users);
      } else {
        res.status(200).send({message: messages.emptyTable});
      }
    })
    .catch(function(error) {
      res.status(400).send({error: error});
    });
};

module.exports.findOne = function(req, res) {
  User.findById(req.params.id).exec()
    .then(function(user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send({message: messages.unableToLocate});
      }
    })
    .catch(function(error) {
      res.status(400).send({error: error.message});
    });
};

module.exports.deleteOne = function(req, res) {
  User.findByIdAndRemove(req.params.id).exec()
    .then(function(deletedUser) {
      if (deletedUser) {
        res.status(200)
          .send({message: messages.userDeleted(deletedUser.emailAddress)});
      } else {
        res.status(400).send({message: messages.unableToLocate});
      }
    })
    .catch(function(error) {
      res.status(400).send({error: error.message});
    });
};

module.exports.updateOne = function(req, res) {
  User.findById(req.params.id).exec()
    .then(function(user) {
      if (user) {
        _.assign(user, req.body);
        user.save()
          .then(function(updatedUser) {
            if (user) {
              res.status(201).send(updatedUser);
            } else {
              res.status(400)
                .send({message: "Unable to locate user."});
            }
          })
          .catch(function(error) {
            res.status(400).send({error: error.message});
          });
      } else {
        res.status(200).send({message: messages.unableToLocate});
      }
    })
    .catch(function(error) {
      res.status(400).send({error: error.message});
    });
};
