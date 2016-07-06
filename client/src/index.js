/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {validateAuthToken} from './modules/authentication.duck';

// Misc.
require('./favicon.ico'); // Tell webpack to load favicon.ico

// Vendor Libraries
window.jQuery = require('jquery');
window.$ = require('jquery');
require('materialize-css/dist/css/materialize.css');
require('./lib/js/materialize');
require('./styles/styles.scss');


// Store
const store = configureStore();

const token = localStorage.getItem('token');
if (token) {
  // Need to validate the token here
  store.dispatch(validateAuthToken(token));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);