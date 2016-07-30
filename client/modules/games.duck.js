import initialState from './initial-state';
import axios from 'axios';

/****************************************
 *  Constants
 ****************************************/
const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';

const LOAD_GAMES_REQUEST = 'LOAD_GAMES_REQUEST';
const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS';
const LOAD_GAMES_FAILURE = 'LOAD_GAMES_FAILURE';

/****************************************
 *  Reducer
 ****************************************/
export default function reducer(state = initialState.games, action) {

  switch (action.type) {

    case LOAD_GAMES_REQUEST:
      return Object.assign({}, state, {loading: true, error: null, titles: []});

    case LOAD_GAMES_SUCCESS:
      return Object.assign({}, state, {loading: false, error: null, titles: action.games});

    case LOAD_GAMES_FAILURE:
      return Object.assign({}, state, {loading: false, error: action.error, titles: []});

    default:
      return state;
  }
}
/****************************************
 *  Action Creators
 ****************************************/
export function loadGamesRequest() {
  return {
    type: LOAD_GAMES_REQUEST
  };
}

export function loadGamesSuccess(response) {
  return {
    type: LOAD_GAMES_SUCCESS,
    games: response.data.results
  };
}

export function loadGamesFailure(response) {
  let message;

  switch (response.message){
    case 'Network Error':
      message = 'A sever error has occured. Please try again.';
      break;
    default:
      message = response.message;
  }

  return {
    type: LOAD_GAMES_FAILURE,
    error: message
  };
}


export function loadGames() {
  return (dispatch) => {
    dispatch(loadGamesRequest());
    axios.get('http://localhost:3000/games')
      .then(function(response) {
        dispatch(loadGamesSuccess(response));
      })
      .catch(function(response) {
        dispatch(loadGamesFailure(response));
      });
  };
}

export const actions = {loadGames};