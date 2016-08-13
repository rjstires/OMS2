import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app.component';
import HomePage from './components/home-page.component';
import NotFoundPage from './components/not-found.component';

// User Routes
import LoginPage from './components/auth/login.page'; // eslint-disable-line import/no-named-as-default
import RegisterPage from './components/auth/register.page.js'; // eslint-disable-line import/no-named-as-default
import UserProfile from './components/user/user-profile.container.js'; // eslint-disable-line import/no-named-as-default
import ConfirmEmail from './components/auth/confirm-email.container.js';

// Games Routes
import GamesPage from './components/games/games.page.js';
import ListGamesContainer from './components/games/list.container.js';

export default (
  <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="register" component={RegisterPage}/>
      <Route path="confirm" component={ConfirmEmail}/>
      <Route path="profile" component={UserProfile}/>

      { /** Games **/ }
      <Route path="games" component={GamesPage}>
            <IndexRoute component={ListGamesContainer} />
      </Route>


      <Route path="*" component={NotFoundPage}/>
  </Route>
);