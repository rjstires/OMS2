/* eslint-disable no-console */

const chalk = require('chalk');
const _ = require('lodash');
const util = require('util');
const config = require('../config');

function report(color){
  if(config.env !== 'development'){return;}

  return function message() {
    _.each(arguments, function(element) {
      if(typeof element === 'object'){
        console.log(util.inspect(element, {depth: null}));
        return;
      }
      console.log(chalk[color](element));
    });
  };
}

module.exports = {
  success: report('green'),
  error: report('red'),
  notice: report('blue')
};