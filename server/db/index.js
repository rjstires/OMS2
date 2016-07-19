const config = require('../config');
const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
var consoleLog = require('../utilities/consoleLog.js');

// Bookshelf and plugs
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals');

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;

// Reset database on server load.
// TODO Seed database
if (config.env === 'development') {
  // const pathToData = path.join(config.paths.root, 'db/dev.sqlite3');
  // dropDatabase(pathToData)
  //   .then(runLatestMigration);
  //   .then(seedDatabase);
  runLatestMigration().then(function() {
    consoleLog.success('Migrations complete.');
  });
}

function runLatestMigration() {
  return new Promise(function(resolve, reject) {
    knex.migrate.latest([dbConfig])

      .then(function() {
        resolve();
      })

      .catch(function() {
        reject();
      });
  });
}

function seedDatabase() {}

function dropDatabase(path) {
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(err) {
      if (err) {
        resolve();
      }

      fs.truncate(path, 0, function(err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
}
