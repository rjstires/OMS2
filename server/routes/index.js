const router = require('express').Router(); // eslint-disable-line new-cap
const authRoutes = require('./auth.routes.js');
const customerRoutes = require('./customer.routes.js');
const gameRoutes = require('./game.routes.js');
const optionTypeRoutes = require('./option-type.routes');

router.use('/',
  authRoutes,
  customerRoutes,
  optionTypeRoutes,
  gameRoutes
);

module.exports = router;
