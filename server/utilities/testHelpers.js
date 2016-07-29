const dbConfig = require('../db/knexfile');
const knex = require('knex')(dbConfig);
const _ = require('lodash');

module.exports = {
  cleanDatabase: function(done) {
    knex.select().from('sqlite_master').where({type: 'table'})
      .then(function(tables) {

        // Delete all tables...
        _.each(tables, function(t) {
          if (t.tbl_name === 'sqlite_sequence') {
            return;
          }

          knex.schema.dropTableIfExists(t.tbl_name).then(null, function(error) {
              throw new Error(error);
            }
          );
        });

        knex.migrate.latest().then(
          function() {
            done();
          },
          function(err) {
            console.log('Error occured during migration.');
            throw new Error(err);
          }
        );
      })
      .catch(function(err) {
        console.log(err);
        done();
      });
  }
};