const router = require('express').Router(); // eslint-disable-line new-cap

router.use('/customers', require('./customer.routes.js'));
router.use('/games', require('./game.routes.js'));
router.use('/options-types', require('./option-type.routes'));
router.use('/', require('./auth.routes.js'));

module.exports = router;
