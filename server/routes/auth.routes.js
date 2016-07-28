const router = require('express').Router(); // eslint-disable-line new-cap
const authController = require('../controllers/auth.controller.js');

router.route('/login')
  .post(authController.login);

router.route('/register')
  .post(authController.register);

router.route('/confirm')
  .get(authController.confirm);

router.route('/validate-token')
  .get(authController.validateToken);

module.exports = router;
