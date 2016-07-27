const boostingBookshelf = require('../models/base.model');

const OptionValue = boostingBookshelf.Model.extend({
  tableName: 'option_values',
  type: function() {
    return this.belongsTo('OptionType');
  }
});

module.exports = boostingBookshelf.model('OptionValue', OptionValue);