const boostingBookshelf = require('../models/base.model');
const constants = require('./constants');

const Customer = boostingBookshelf.Model.extend({
  tableName: 'customers',
  options: function() {
    return this.morphMany('Option', constants.OPTIONABLE);
  },
  
  contacts: function() {
    return this.morphMany('Contact', constants.CONTACTABLE);
  }
});

const Customers = boostingBookshelf.Collection.extend({
  model: Customer
});

module.exports = {
  Customer: boostingBookshelf.model('Customer', Customer),
  Customers: boostingBookshelf.model('Customers', Customers)
};
