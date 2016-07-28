const router = require('express').Router(); // eslint-disable-line new-cap
const CustomerController = require('../controllers/customer.controller.js');

// Customers
router.route('/')
  .get(CustomerController.getAll.bind(CustomerController))
  .post(CustomerController.create.bind(CustomerController));

// Customer
router.route('/:id')
  .get(CustomerController.read.bind(CustomerController))
  .patch(CustomerController.update.bind(CustomerController))
  .delete(CustomerController.destroy.bind(CustomerController));
module.exports = router;
