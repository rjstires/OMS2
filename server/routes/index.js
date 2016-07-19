var router = require('express').Router(); // eslint-disable-line new-cap
var authRoutes = require('./auth.routes.js');

router.use('/', authRoutes);

module.exports = router;
