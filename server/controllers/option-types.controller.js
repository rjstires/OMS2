const BaseController = require('./base.controller');
const models = require('./../models');

const OptionTypeController = BaseController.extend({
  model: models.OptionType
});

module.exports = OptionTypeController;