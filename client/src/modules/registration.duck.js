// registration.js
import axios from 'axios';
import {browserHistory} from 'react-router';
import {bannerNote} from './banner-note.duck';
import initialState from './initial-state';

/****************************************
 *  Constants
 ****************************************/
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const CONFIRM_TOKEN_REQUEST = 'CONFIRM_TOKEN_REQUEST';
const CONFIRM_TOKEN_SUCCESS = 'CONFIRM_TOKEN_SUCCESS';
const CONFIRM_TOKEN_FAILURE = 'CONFIRM_TOKEN_FAILURE';

const UPDATE_USER = 'UPDATE_USER';

/****************************************
 *  Reducer
 ****************************************/
export default function reducer(state = initialState.registration, action) {
  switch (action.type) {

    /****************************************
     *  User Registration
     ****************************************/
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        loading: false
      });

    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        loading: false
      });

    /****************************************
     *  Email Confirmation
     ****************************************/
    case CONFIRM_TOKEN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        user: {
          emailConfirmed: false

        }
      });

    case CONFIRM_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: {
          emailConfirmed: true
        }
      });

    case CONFIRM_TOKEN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: {
          emailConfirmed: false
        }
      });

    case UPDATE_USER:
      return Object.assign({}, state, {user: action.user});

    default:
      return state;
  }
}

/****************************************
 *  Action Creators
 ****************************************/

export function registerRequest(credentials) {
  return {
    type: REGISTER_REQUEST,
    credentials
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}

export function registerFailure() {
  return {
    type: REGISTER_FAILURE
  };
}

export function registerUser(credentials) {
  return (dispatch) => {
    dispatch(registerRequest(credentials));
    axios.post('http://localhost:4000/register', credentials)
      .then(() => {
        browserHistory.push('/');
        dispatch(registerSuccess());
        dispatch(bannerNote('Successfully registered, please login.', 2500));
      })
      .catch((response) => {
        dispatch(registerFailure());
        dispatch(bannerNote(response.data.message, 2500, 'error'));
      });
  };
}

// Email Token Confirmation
export function confirmTokenRequest(token) {
  return {
    type: CONFIRM_TOKEN_REQUEST,
    token
  };
}

export function confirmTokenSuccess() {
  return {
    type: CONFIRM_TOKEN_SUCCESS
  };
}

export function confirmTokenFailure(error) {
  return {
    type: CONFIRM_TOKEN_FAILURE,
    error
  };
}

export function confirmToken(token) {
  return (dispatch) => {
    dispatch(confirmTokenRequest(token));
    console.log('sending request');
    axios.get(`http://localhost:4000/confirm?token=${token}`)
      .then(function(response) {
        dispatch(confirmTokenSuccess());
      })
      .catch(function(error) {
        dispatch(confirmTokenFailure(error));
      });
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export const actions = {registerUser, confirmToken, updateUser};