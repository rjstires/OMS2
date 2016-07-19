/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {validateJWT} from './modules/registration.duck';

// Misc.
require('./favicon.ico'); // Tell webpack to load favicon.ico

// Scripts
window.jQuery = require('jquery');
window.$ = require('jquery');
require('./lib/js/jquery-ui');
require('./lib/js/jquery.nanoscroller');
require('./lib/js/jquery.gritter');
require('./lib/js/flat_dream');
require('./lib/js/bootstrap');


// Stylesheets
require('./lib/styles/bootstrap.css');
require('./lib/styles/jquery.gritter.css');
require('./lib/styles/font-awesome.css');
require('./lib/styles/style-gray.css');
require('./lib/styles/nanoscroller.css');
require('./styles/styles.scss');

// Store
const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  // Need to validate the token here
  store.dispatch(validateJWT(token));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);