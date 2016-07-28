/**
 * routes/index.js
 * Scan routes/ folder for all *.routes.js files and create a route
 * for it where the path is the word before .routes.js.
 */

const router = require('express').Router(); // eslint-disable-line new-cap
const readDir = require('readdir');
const _ = require('lodash');
const files = readDir.readSync(__dirname, ['*.routes.js']);
let noun, routePath, routeModule;

_.each(files, function(file) {
  noun = file.substr(0, file.indexOf('.'));
  routePath =(noun === 'auth') ? '/' : `/${noun}`;
  routeModule = `./${file}`;
  router.use(routePath, require(routeModule));
});

module.exports = router;
