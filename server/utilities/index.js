const jwt = require('jwt-simple');
const _ = require('lodash');
const config = require('../config');

/**
 * Generate a random string to the size of length.
 * @param {number} [length=20] - The length of the string.
 * @return {string} - The generated string.
 */
const stringGen = function(length) {
  length = length || 20;
  let text = ' ';

  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return text.toUpperCase().trim();
};

/**
 * Encode the payload using JWT-Simple.
 * TODO JIT. Storage in REDIS/MEMCACHE or similar memory storage.
 * @param {object} params - Object which will extend the payload.
 * @param {number} [days=1] - Number of days before token expires.
 * @return {String} - JWT encoded token.
 */
const createToken = function(params, days) {
  const hours = (days) ? (days * 24) : 24;
  const iat = new Date().getTime() / 1000;
  const exp = iat + (60 * 60 * hours);

  const payload = {
    iss: config.auth.issuer,
    aud: config.auth.audience,
    iat,
    exp
  };

  _.extend(payload, params);

  return jwt.encode(payload, config.auth.secret);
};

/**
 * Attempt to decode the JWT token using JWT-Simple
 * @param {string} token - Encoded JWT token.
 * @param {function} callback - Node style callback function.
 */
const validateToken = function(token, callback) {
  try {
    const decoded = jwt.decode(token, config.auth.secret);

    const curr = new Date().getTime() / 1000;
    if (decoded.exp < curr){
      callback('Expired token.', null);
      return;
    }

    callback(null, decoded);
  } catch (e) {
    callback(e, null);
  }
};

module.exports = {
  stringGen: stringGen,
  createToken: createToken,
  validateToken: validateToken
};