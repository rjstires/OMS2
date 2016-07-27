const boostingBookshelf = require('../models/base.model');

const ContactType = boostingBookshelf.Model.extend({
  tableName: 'contact_types',

  contacts: function() {
    return this.hasMany('Contact');
  }
});

module.exports = boostingBookshelf.model('ContactType', ContactType);