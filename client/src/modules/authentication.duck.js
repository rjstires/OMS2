// authentication.js
import axios from 'axios';
import {browserHistory} from 'react-router';
import {sendBannerNote} from './banner-note.duck'; //TODO
import initialState from './initial-state';
import {actions as registration}from './registration.duck';

/****************************************
 *  Constants
 ****************************************/
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST';
const VALIDATE_TOKEN_SUCCESS= 'VALIDATE_TOKEN_SUCCESS';
const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';

/****************************************
 *  Reducer
 ****************************************/
export default function reducer(state = initialState.registration, action) {
  switch (action.type) {

    /****************************************
     *  Login
     ****************************************/
    case LOG_IN_REQUEST:
      return Object.assign({}, state, {
        loggedIn: false,
        loading: true
      });

    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        loading: false
      });

    case LOG_IN_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        loading: false
      });

    /****************************************
     *  Logout
     ****************************************/
    case LOG_OUT_REQUEST:
      return Object.assign({}, state, {
        loggedIn: false,
        loading: false
      });

    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: false,
        loading: false
      });

    case LOG_OUT_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        loading: false
      });

    default:
      return state;
  }
}

/****************************************
 *  Action Creators
 ****************************************/

// Login
export function loginRequest(credentials) {
  return {
    type: LOG_IN_REQUEST,
    credentials
  };
}

export function loginSuccess() {
  return {
    type: LOG_IN_SUCCESS
  };
}

export function loginFailure() {
  return {
    type: LOG_IN_FAILURE
  };
}

export function login(credentials) {
  return function(dispatch) {
    dispatch(loginRequest(credentials));
    axios.post('http://localhost:4000/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.jwt);
        dispatch(loginSuccess());
        dispatch(registration.updateUser(response.data.user));
        browserHistory.push('/');
        dispatch(sendBannerNote('Successfully logged in.'));
      })
      .catch(error => {
        dispatch(sendBannerNote(error.data, 2500, 'error'));
        dispatch(loginFailure());
      });
  };
}

// Logout
export function logoutRequest() {
  return {
    type: LOG_OUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: LOG_OUT_SUCCESS
  };
}

export function logoutFailure() {
  return {
    type: LOG_OUT_FAILURE
  };
}

export function logout() {
  return function(dispatch) {
    dispatch(logoutRequest());

    localStorage.removeItem('token');

    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(registration.removeUser());
      dispatch(logoutSuccess());
      browserHistory.push('/');
      dispatch(sendBannerNote('Successfully logged out.'));
    } else {
      dispatch(logoutFailure());
    }

  };
}

export function validateTokenRequest(token) {
  return {
    type: VALIDATE_TOKEN_REQUEST,
    token
  };
}

export function validateTokenSuccess() {
  return {
    type: VALIDATE_TOKEN_SUCCESS
  };
}

export function validateTokenFailure() {
  return {
    type: VALIDATE_TOKEN_FAILURE
  };
}

export function validateAuthToken(token) {
  return (dispatch) => {
    dispatch(validateTokenRequest());
    axios.get(`http://localhost:4000/validate-token?token=${token}`)
      .then(function(response) {
        dispatch(validateTokenSuccess(response));
        dispatch(registration.updateUser(response.data.user));
        dispatch(loginSuccess());
      })
      .catch(function(response) {
        dispatch(validateTokenFailure(response));
      });
  };
}
export const actions = {login, logout, validateAuthToken};