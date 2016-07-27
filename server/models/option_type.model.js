const boostingBookshelf = require('../models/base.model');
const constants = require('./constants');

const OptionType = boostingBookshelf.Model.extend({
  tableName: 'option_types',

  optionable: function() {
    return this.morphTo(constants.OPTIONABLE, 'Contact');
  },

  values: function() {
    return this.hasMany('OptionValue');
  }
});

module.exports = boostingBookshelf.model('OptionType', OptionType);
