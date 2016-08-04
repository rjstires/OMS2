import initialState from './initial-state';
import axios from 'axios';
import _ from 'lodash';

/****************************************
 *  Constants
 ****************************************/
const LOAD_GAMES_REQUEST = 'LOAD_GAMES_REQUEST';
const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS';
const LOAD_GAMES_FAILURE = 'LOAD_GAMES_FAILURE';

const CREATE_GAME_REQUEST = 'CREATE_GAME_REQUEST';
const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';

const DELETE_GAME_REQUEST = 'DELETE_GAME_REQUEST';
const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
const DELETE_GAME_FAILURE = 'DELETE_GAME_FAILURE';

const UPDATE_GAME_REQUEST = 'UPDATE_GAME_REQUEST';
const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
const UPDATE_GAME_FAILURE = 'UPDATE_GAME_FAILURE';

const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
const CLEAR_CURRENT_GAME = 'CLEAR_CURRENT_GAME';

/****************************************
 *  Reducer
 ****************************************/
export default function reducer(state = initialState.games, action) {

  switch (action.type) {

    /** Load games. **/
    case LOAD_GAMES_REQUEST:
      return Object.assign({}, state, {error: null, titles: []});

    case LOAD_GAMES_SUCCESS:
      return Object.assign({}, state, {error: null, titles: action.games});

    case LOAD_GAMES_FAILURE:
      return Object.assign({}, state, {error: action.error, titles: []});

    /** Create a game. **/
    case CREATE_GAME_REQUEST:
      return Object.assign({}, state, {error: null});

    case CREATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        titles: [...state.titles, action.game]
      });

    case CREATE_GAME_FAILURE:
      return Object.assign({}, state, {error: action.error});

    /** Delete a game **/
    case DELETE_GAME_REQUEST:
      return Object.assign({}, state, {error: null});

    case DELETE_GAME_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        titles: _.filter(state.titles, function(title) {
          return title.id !== action.id;
        })
      });

    case DELETE_GAME_FAILURE:
      return Object.assign({}, state, {error: action.error});

    case SET_CURRENT_GAME:
      return Object.assign({}, state, {currentGame: action.game});

    case CLEAR_CURRENT_GAME:
      return Object.assign({}, state, {currentGame: null});

    case UPDATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        titles: state.titles.map(function(title) {
          if (parseInt(title.id) === parseInt(action.game.id)) {
            return action.game;
          }

          return title;
        })
      });

    default:
      return state;
  }
}

/****************************************
 *  Action Creators
 ****************************************/

/** Load games. **/
export function loadGamesRequest() {
  return {
    type: LOAD_GAMES_REQUEST
  };
}

export function loadGamesSuccess(response) {
  const data = response.data.results || {};

  return {
    type: LOAD_GAMES_SUCCESS,
    games: data
  };
}

export function loadGamesFailure(response) {
  let message;

  switch (response.message) {
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
    return axios.get('http://localhost:3000/games')
      .then((response) => dispatch(loadGamesSuccess(response)))
      .catch((response) => dispatch(loadGamesFailure(response)));
  };
}

/** Create a game. **/
export const createGameRequest = () => {
  return {
    type: CREATE_GAME_REQUEST
  };
};

export const createGameSuccess = (response) => {
  return {
    type: CREATE_GAME_SUCCESS,
    game: response.data
  };
};

export const createGameFailure = (response) => {
  return {
    type: CREATE_GAME_FAILURE,
    error: 'Shit happened.'
  };
};

export const createGame = (game) => {
  return (dispatch) => {
    dispatch(createGameRequest());
    return axios.post('http://localhost:3000/games', game)
      .then((response) => dispatch(createGameSuccess(response)))
      .catch((response) => dispatch(createGameFailure(response)));
  };
};

/** Delete a game **/
export const deleteGameRequest = () => {
  return {
    type: DELETE_GAME_REQUEST
  };
};

export const deleteGameSuccess = (id) => {
  return {
    type: DELETE_GAME_SUCCESS,
    id: id
  };
};

export const deleteGameFailure = (response) => {
  return {
    type: DELETE_GAME_FAILURE,
    error: 'Shit happened.'
  };
};

export const deleteGame = (id) => {
  return (dispatch) => {
    dispatch(deleteGameRequest());
    return axios.delete(`http://localhost:3000/games/${id}`)
      .then(() => dispatch(deleteGameSuccess(id)))
      .catch((response) => dispatch(deleteGameFailure(response)));
  };
};

export const setCurrentGame = (game) => {
  return {
    type: SET_CURRENT_GAME,
    game: game
  };
};

export const clearCurrentGame = () => {
  return {
    type: CLEAR_CURRENT_GAME
  };
};

export const updateGameRequest = (game) => {
  return {
    type: UPDATE_GAME_REQUEST
  };
};

export const updateGameSuccess = (response) => {
  return {
    type: UPDATE_GAME_SUCCESS,
    game: response.data
  };
};

export const updateGameFailure = (error) => {
  return {
    type: UPDATE_GAME_FAILURE,
    error
  };
};

export const updateGame = (id, game) => {
  const updatedGame = stripUnedittableFields(game);

  return (dispatch) => {
    return axios.patch(`http://localhost:3000/games/${id}`, updatedGame)
      .then( (response) => dispatch(updateGameSuccess(response) ))
      .catch( (error) => dispatch(updateGameFailure(error) ));
  };
};

export const actions = {
  loadGames,
  createGame,
  deleteGame,
  updateGame,
  setCurrentGame,
  clearCurrentGame
};

function stripUnedittableFields(original) {
  return _.pick(original, ['title']);
}