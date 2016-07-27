const model = require('../models/index');
const BaseController = require('./base.controller');

const CustomerController = BaseController.extend({
  model: model.Customer
});

module.exports = CustomerController;