const config = require('../config');
const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);
const consoleLog = require('../utilities/consoleLog');
const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

// Bookshelf and plugs
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals');

module.exports.knex = knex;
module.exports.bookshelf = bookshelf;

// Reset database on server load.
// TODO Seed database
if (config.env === 'development') {
  const pathToData = path.join(config.paths.root, 'db/dev.sqlite3');
  dropDatabase(pathToData)
    .then(runLatestMigration)
    .then(function() {
      consoleLog.success('All done!');
    });
  //  .then(seedDatabase);
}
 
function runLatestMigration() {
  return new Promise(function(resolve, reject) {
    knex.migrate.latest([dbConfig])
      .then(function() {
        consoleLog.success('Migrations successful.');
        resolve();
      })
      .catch(function(response) {
        consoleLog.error('Migrations failed.', response);
        reject();
      });
  });
}

function seedDatabase() {

}

function dropDatabase(path) {
  consoleLog.notice('Dropping data from database: ' + path);
  return new Promise(function(resolve, reject) {
    fs.stat(path, function(err) {
      if (err) {
        resolve();
      }

      fs.truncate(path, 0, function(err) {
        if (err) {
          reject(err);
        }
        consoleLog.success('Successfully emptied database.');
        resolve();
      });
    });
  });
}
