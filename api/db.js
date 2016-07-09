const config = require("./config.js");
const Sequelize = require("sequelize");

const params = {
  host: config.db.host,
  dialect: "postgres"
};

const connection = new Sequelize(config.db.name, config.db.user, config.db.password, params);

module.exports = connection;

