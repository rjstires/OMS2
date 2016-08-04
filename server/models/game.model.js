const boostingBookshelf = require('../models/base.model');
const constants = require('./constants');

const Game = boostingBookshelf.Model.extend({

  tableName: 'games',

  options: function() {
    return this.morphMany('Option', constants.OPTIONABLE);
  },

  validationRules: {
    title: 'required'
  }

});

module.exports = boostingBookshelf.model('Game', Game);
