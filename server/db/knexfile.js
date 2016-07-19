const config = require('../config');
const path = require('path');

const c = {

  development: {
    client: 'sqlite3',
    //debug: true,
    migrations: {
      directory: path.join(config.paths.root, 'db/migrations')
    },
    connection: {
      filename: path.join(config.paths.root, 'db/dev.sqlite3')
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: config.db.host,
      database: config.db.name,
      user:     config.db.name,
      password: config.db.password
    },

    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(config.paths.root, 'db/migrations')
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: config.db.host,
      database: config.db.name,
      user:     config.db.name,
      password: config.db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(config.paths.root, 'db/migrations')
    }
  }
};
module.exports = c[config.env];