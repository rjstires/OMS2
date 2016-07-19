const db = require('../db/index');
const crypto = require('crypto');
const bookshelf = db.bookshelf;
const SECRET = 'rabblerabble';
const Promise = require('bluebird');
const consoleLog = require('../utilities/consoleLog');

const User = bookshelf.Model.extend({
  tableName: 'users',

  initialize: function() {

    this.on('creating', function() {
      this.set('confirmationToken', generateToken());
    });

    this.on('saving', this.saving, this);
  },

  saving: function() {
    if(this.attributes.emailAddress) {
      this.set('emailAddress', this.attributes.emailAddress.trim().toLowerCase());
    }
  },

  confimationToken: {
    get: function() {
      return this.get('confirmationToken');
    },

    set: function() {
      return generateToken();
    }
  },

  virtuals: {
    password: {
      set: function(value) {
        const salt = generateToken(64);
        const passwordHash = hashPassword(value, salt, SECRET); // TODO extract secret;
        this.set('passwordSalt', salt);
        this.set('passwordHash', passwordHash);
      },

      get: function() {
        return this.get('passwordHash');
      }
    }
  },

  outputVirtuals: false
}, {

  login: Promise.method(function(emailAddress, challengePassword) {
    if (!emailAddress || !challengePassword) {
      throw new Error('Email and password must be set.');
    }

    emailAddress = emailAddress.trim().toLowerCase();

    return new this({emailAddress: emailAddress}).fetch({require: true})
      .tap(function(user) {
        const passwordHash = user.get('passwordHash');
        const passwordSalt = user.get('passwordSalt');
        const validated = validatePassword(passwordHash, passwordSalt, SECRET, challengePassword); // TODO Extrac secret.

        if (!validated) {
          throw new Error('Unauthorized');
        }

        return validated;
      });
  }),

  confirmAccount: function(token) {
    const self = this;
    return new Promise(function(resolve, reject) {
      new self({confirmationToken: token}).fetch()
        .tap(function(user) {
          if(!user) return;
          user.set('emailConfirmed', true);
          user.save()
            .catch(function(error) {
              reject(error);
            });
        })
        .then(function(user) {
          if(!user) {
            reject('Unable to locate use with that token');
            return;
          }
          resolve(user);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
});

module.exports = User;

// TODO Documentation
function generateToken(len) {
  len = len || 24;
  return crypto.randomBytes(len).toString('hex');
}
// TODO Documentation
function validatePassword(hashedPassword, salt, secret, challenge) {
  return hashedPassword === hashPassword(challenge, salt, secret);
}

/**
 * Encrypt password, prepended with salt, use SHA256 encryption.
 *
 * @param {string} password - User supplied unencrypted password.
 * @param {string|*} salt
 * @param {string} secret
 * @returns {string}
 */
function hashPassword(password, salt, secret) {
  return crypto.createHmac('sha256', secret)
    .update(salt + password)
    .digest('hex');
}
