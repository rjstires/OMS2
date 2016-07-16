'use strict';
const path = require('path');

const values = {
  paths: {
    root_url: 'http://localhost:3000',
    root: __dirname
  },

  env: process.env.NODE_ENV || 'development',

  db: {
    host: process.env.dbHost || 'localhost',
    port: process.env.dbPort || 5433,
    name: process.env.dbName ||'oms_test',
    user: process.env.dbUser || 'postgres',
    password: process.env.dbPassword || 'Password1!'
  },

  sendMail: {
    apiKey: process.env.mandrillAPIKey || 'QbCGpSL1dPSZ1wpP_ZWFsw'
  },

  auth: {
    secret: process.env.auth_secret || 'rabblerabblerabble',
    issuer: 'http://localhost:4000',
    audience: 'http://localhost:3000'
  }

};

values.db.link = 'mongodb://' + values.db.user + ':' + values.db.password + '@' + values.db.host + ':' + values.db.port + '/' + values.db.name;

module.exports = values;