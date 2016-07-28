/**
 * routes/index.js
 * Scan routes/ folder for all *.routes.js files and create a route
 * for it where the path is the word before .routes.js (noun).
 */

const router = require('express').Router(); // eslint-disable-line new-cap
const readDir = require('readdir');
const _ = require('lodash');
const files = readDir.readSync(__dirname, ['*.routes.js']);
let routes = [];

// Bould the collection.
_.each(files, function(file) {
  routes.push({
    path: '/' + file.substr(0, file.indexOf('.')),
    module: `./${file}`
  });
});

// Overrides
routes = routes.map(function(route) {
  if(route.path === '/auth'){
    return _.assign({}, route, {path: '/'});
  }

  return route;
});

// Sorting
_.orderBy(routes, function(r) {
  return r.path;
});

// Initialize the routes
_.each(routes, function(route) {
  router.use(route.path, require(route.module));
});
module.exports = router;
