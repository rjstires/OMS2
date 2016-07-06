// registration.js
import axios from 'axios';
import {browserHistory} from 'react-router';
import initialState from './initial-state';
import {Toast} from '../utilities';

/****************************************
 *  Constants
 ****************************************/
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST';
const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
const VALIDATE_TOKEN_FAILURE = 'VALIDATE_TOKEN_FAILURE';

const VALIDATION_JWT_REQUEST = 'VALIDATION_JWT_REQUEST';
const VALIDATE_JWT_SUCCESS = 'VALIDATE_JWT_SUCCESS';
const VALIDATE_JWT_FAILURE = 'VALIDATE_JWT_FAILURE';

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
     *  Login
     ****************************************/
    case LOG_IN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      });

    case LOG_IN_FAILURE:
      return Object.assign({}, state, {
        loading: false
      });

    /****************************************
     *  Logout
     ****************************************/
    case LOG_OUT_REQUEST:
      return Object.assign({}, state, {
        loading: false
      });

    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: initialState.registration.user
      });

    case LOG_OUT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: initialState.registration.user
      });

    /****************************************
     *  Email Confirmation
     ****************************************/
    case VALIDATION_JWT_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        user: {
          emailConfirmed: false
        }
      });

    case VALIDATE_JWT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: {
          emailConfirmed: true
        }
      });

    case VALIDATE_JWT_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: {
          emailConfirmed: false
        }
      });

    case VALIDATE_TOKEN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case VALIDATE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        user: action.user
      });

    case VALIDATE_TOKEN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        user: initialState.registration.user
      });

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
        Toast.success('Successfully registered. Please check your email.');
      })
      .catch((response) => {
        dispatch(registerFailure());
        Toast.error(response.data.message);
      });
  };
}

// Email Token Confirmation
export function confirmEmailRequest(token) {
  return {
    type: VALIDATE_TOKEN_REQUEST,
    token
  };
}

export function confirmEmailSuccess(user) {
  return {
    type: VALIDATE_TOKEN_SUCCESS,
    user
  };
}

export function confirmEmailFailure(error) {
  return {
    type: VALIDATE_TOKEN_FAILURE,
    error
  };
}

export function confirmEmail(token) {
  return (dispatch) => {
    dispatch(confirmEmailRequest(token));
    // TODO Extract link to config file.
    axios.get(`http://localhost:4000/confirm?token=${token}`)
      .then(function(response) {
        // TODO Forward user to index and send banner note.
        Toast.success('Thank you for confirming your email address');
        Toast.info('You`ve been automatically logged in.');
        dispatch(loginSuccess(response.data.user, response.data.jwt));
      })
      .catch(function(error) {
        dispatch(confirmEmailFailure(error));
      });
  };
}

// Login
export function loginRequest(credentials) {
  return {
    type: LOG_IN_REQUEST,
    credentials
  };
}

export function loginSuccess(user, token) {

  // Save token
  localStorage.setItem('token', token);

  return {
    type: LOG_IN_SUCCESS,
    user
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
    // TODO Extract link to config file.
    axios.post('http://localhost:4000/login', credentials)
      .then(response => {
        dispatch(loginSuccess(response.data.user));
        browserHistory.push('/');
        Toast.success('Successfully logged in.');
      })
      .catch(error => {
        Toast.error(error.data);
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
    dispatch(logoutSuccess());
    browserHistory.push('/');
    Toast.success('Successfully logged out.');
  };
}

// Validate JWT
export function validateJWTRequest(token) {
  return {
    type: VALIDATION_JWT_REQUEST,
    token
  };
}

export function validateJWTSuccess(user) {
  return {
    type: VALIDATE_JWT_SUCCESS,
    user
  };
}

export function validateJWTFailure(error) {
  return {
    type: VALIDATE_JWT_FAILURE,
    error
  };
}

export function validateJWT(token) {
  return (dispatch) => {
    dispatch(validateJWTRequest());
    axios.get(`http://localhost:4000/validate-token?token=${token}`)
      .then(function(response) {
        dispatch(loginSuccess(response.data.user, response.data.jwt));
      })
      .catch(function(response) {
        localStorage.removeItem('token');
        dispatch(validateJWTFailure(response));
      });
  };
}

export const actions = {
  login,
  logout,
  validateJWT,
  registerUser,
  confirmEmail
};