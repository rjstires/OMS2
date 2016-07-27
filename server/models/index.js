const customerModel = require('./customer.model');

module.exports = {
  Customer: customerModel.Customer,
  Customers: customerModel.Customers,
  Contact: require('./contact.model'),
  OptionType: require('./option_type.model'),
  OptionValue: require('./option_value.model'),
  ContactType: require('./contact_type.model')
};