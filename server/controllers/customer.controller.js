const models = require('../models/index');
const BaseController = require('./base.controller');

const CustomerController = BaseController({
  model: models.Customer
});

module.exports = CustomerController;