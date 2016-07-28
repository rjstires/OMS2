const router = require('express').Router(); // eslint-disable-line new-cap
const GameController = require('../controllers/game.controller.js');

// Games
router.route('/games')
  .get(GameController.getAll.bind(GameController))
  .post(GameController.create.bind(GameController));

// Game
router.route('/games/:id')
  .get(GameController.read.bind(GameController))
  .patch(GameController.update.bind(GameController))
  .delete(GameController.destroy.bind(GameController));

module.exports = router;
