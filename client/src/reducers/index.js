import { combineReducers } from 'redux';
import authenticated from '../modules/authentication.duck';
import registration from '../modules/registration.duck';
import bannerNote from '../modules/banner-note.duck';

import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  authenticated,
  registration,
  bannerNote,
  form
});

export default rootReducer;
