import { combineReducers } from 'redux';
import registration from '../modules/registration.duck';
import games, {CREATE_GAME_SUCCESS, UPDATE_GAME_SUCCESS, CLEAR_CURRENT_GAME} from '../modules/games.duck';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  registration,
  form: formReducer.plugin({
    gameForm: (state, action) => {
      switch(action.type) {

        case CREATE_GAME_SUCCESS:
          return undefined;

        case UPDATE_GAME_SUCCESS:
          return undefined;

        case CLEAR_CURRENT_GAME:
          return undefined;

        default:
          return state;
      }
    }
  }),
  games
});

export default rootReducer;
