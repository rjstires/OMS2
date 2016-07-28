const models = require('../models/index');
const BaseController = require('./base.controller');

const GameController = BaseController({
  model: models.Game
});

module.exports = GameController;