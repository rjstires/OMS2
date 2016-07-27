const router = require('express').Router(); // eslint-disable-line new-cap
const authRoutes = require('./auth.routes.js');
const customerRoutes = require('./customer.routes.js');
const optionTypeRoutes = require('./option-types.routes');

router.use('/',
  authRoutes,
  customerRoutes,
  optionTypeRoutes
);

module.exports = router;
