const router = require('express').Router(); // eslint-disable-line new-cap
const OptionTypesController = require('../controllers/option-types.controller.js');

router.route('/option-types')
  .get(OptionTypesController.getAll.bind(OptionTypesController))
  .post(OptionTypesController.create.bind(OptionTypesController));

router.route('/option-types/:id')
  .get(OptionTypesController.read.bind(OptionTypesController))
  .patch(OptionTypesController.update.bind(OptionTypesController))
  .delete(OptionTypesController.destroy.bind(OptionTypesController));

module.exports = router;
