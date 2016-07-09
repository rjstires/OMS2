"use strict";

var values = {
  paths: {
    root: "http://localhost:3000"
  },
  db: {
    host: process.env.dbHost || "ds013192.mlab.com",
    port: process.env.dbPort || 13192,
    name: process.env.dbName ||"boostingedge",
    user: process.env.dbUser || "level1",
    password: process.env.dbPassword || "password123"
  },

  sendMail: {
    apiKey: process.env.mandrillAPIKey || "QbCGpSL1dPSZ1wpP_ZWFsw"
  },

  auth: {
    secret: process.env.auth_secret || "rabblerabblerabble",
    issuer: "http://localhost:4000",
    audience: "http://localhost:3000"
  }

};

values.db.link = "mongodb://" + values.db.user + ":" + values.db.password + "@" + values.db.host + ":" + values.db.port + "/" + values.db.name;

module.exports = values;