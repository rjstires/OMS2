// banner-note.duck.js

import initialState from './initial-state';

/****************************************
 *  Constants
 ****************************************/
export const SHOW_BANNER_NOTE = 'SHOW_BANNER_NOTE';
export const HIDE_BANNER_NOTE = 'HIDE_BANNER_NOTE';

/****************************************
 *  Reducer
 ****************************************/
export default function reducer(state = initialState.bannerNote, action) {
  switch (action.type) {
    case SHOW_BANNER_NOTE:
      return ( Object.assign({}, state, {
        message: action.message,
        style: action.style
      }));

    case HIDE_BANNER_NOTE:
      return Object.assign({}, state, {
        message: null,
        style: null
      });

    default:
      return state;
  }
}

/****************************************
 *  Action Creators
 ****************************************/
export function showBannerNote(message, style) {
  return {
    type: SHOW_BANNER_NOTE,
    message,
    style
  };
}

export function hideBannerNote() {
  return {
    type: HIDE_BANNER_NOTE
  };
}

export const bannerNote = (message, duration = 2500, style = 'success') => {
  return (dispatch) => {
    dispatch(showBannerNote(message, style));
    setTimeout(function() {
      dispatch(hideBannerNote());
    }, duration);
  };
};

export const actions = { bannerNote };