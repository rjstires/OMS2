const models = require('./../models');
const BaseController = require('./base.controller');

const OptionTypeController = BaseController({
  model: models.OptionType
});

module.exports = OptionTypeController;