var router = require('express').Router(); // eslint-disable-line new-cap
var authRoutes = require('./auth.routes');

router.use('/', authRoutes);

module.exports = router;
