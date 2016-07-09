var router = require("express").Router(); // eslint-disable-line new-cap
var authController = require("../controllers/auth.controller");
var _ = require("lodash");

router.route("/login")
  .post(authController.login);

router.route("/register")
  .post(authController.register);

router.route("/confirm")
  .get(authController.confirm);

router.route("/validate-token")
  .get(authController.validateToken);

module.exports = router;
