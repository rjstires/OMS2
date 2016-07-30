import { combineReducers } from 'redux';
import registration from '../modules/registration.duck';
import games from '../modules/games.duck';

import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  registration,
  form,
  games
});

export default rootReducer;
