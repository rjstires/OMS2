const boostingBookshelf = require('../models/base.model');

const Contact = boostingBookshelf.Model.extend({
  tableName: 'contacts',
  contactable: function() {
    return this.morphTo(constants.CONTACTABLE, 'Customer');
  },

  type: function() {
    return this.belongsTo('ContactType');
  }
});

// Class Methods
Contact.find = function(data, options = {}) {
  return this.forge(data).query(function(qb) {
    qb.select('contacts.value AS value', 'contact_types.value AS type');
    qb.join('contact_types', 'contacts.contact_type_id', 'contact_types.id');
  }).fetchAll(options);
};

module.exports = boostingBookshelf.model('Contact', Contact);


