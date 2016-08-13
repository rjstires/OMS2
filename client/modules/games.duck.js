import initialState from './initial-state';
import axios from 'axios';
import _ from 'lodash';

const apiURI = 'http://localhost:3000/games/'; // TODO EXPORT THIS SOMEWHERE

/****************************************
 *  Constants
 ****************************************/
const LOAD_GAMES_REQUEST = 'LOAD_GAMES_REQUEST';
const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS';
const LOAD_GAMES_FAILURE = 'LOAD_GAMES_FAILURE';

const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';

const DELETE_GAME_REQUEST = 'DELETE_GAME_REQUEST';
const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
const DELETE_GAME_FAILURE = 'DELETE_GAME_FAILURE';

const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';

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
      return Object.assign({}, state, {
        titles: action.games,
        pagination: action.pagination
      });

    case LOAD_GAMES_FAILURE:
      return Object.assign({}, state, {error: action.error, titles: []});

    /** Create a game. **/

    case CREATE_GAME_SUCCESS:
      return Object.assign({}, state, {
        titles: [...state.titles, action.game]
      });

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
      return Object.assign({}, state, {currentGame: {}});

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
  const data = response.data || {};
  const games = data.results;
  const pagination = data.pagination;

  return {
    type: LOAD_GAMES_SUCCESS,
    games,
    pagination
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

export function loadGames(page = 1, pageSize = 5) {
  return (dispatch) => {
    dispatch(loadGamesRequest());
    return axios.get(apiURI, {
      params: {
        page: page,
        pageSize: pageSize
      }
    })
      .then((response) => dispatch(loadGamesSuccess(response)))
      .catch((response) => dispatch(loadGamesFailure(response)));
  };
}

/** Create a game. **/
export const createGame = (game) => {
  return (dispatch) => {

    return axios.post(apiURI, game);
  }
};

export const createGameSuccess = (game) => {
  return {
    type: CREATE_GAME_SUCCESS,
    game
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
    return axios.delete(apiURI + id)
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

export const updateGame = (id, game) => {
  const updatedGame = stripUnedittableFields(game);

  return (dispatch) => {
    return axios.patch(apiURI + id, updatedGame);
  };
};

export const updateGameSuccess = (game) => {
  return {
    type: UPDATE_GAME_SUCCESS,
    game
  };
};

export const actions = {
  loadGames,
  createGame,
  createGameSuccess,
  deleteGame,
  updateGame,
  updateGameSuccess,
  setCurrentGame,
  clearCurrentGame
};

function stripUnedittableFields(original) {
  return _.pick(original, ['title']);
}