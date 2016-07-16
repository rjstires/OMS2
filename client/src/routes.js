import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app.component';
import HomePage from './components/home-page.component';
import LoginPage from './containers/login-page.container'; // eslint-disable-line import/no-named-as-default
import RegisterPage from './containers/register-page.container'; // eslint-disable-line import/no-named-as-default
import NotFoundPage from './components/not-found.component';
import ConfirmEmail from './containers/confirm-email.container';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="confirm" component={ConfirmEmail}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);