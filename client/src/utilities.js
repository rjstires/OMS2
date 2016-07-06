/*global Materialize*/

export const Toast = {

  info: function(message) {
    Materialize.toast(message, 3000, 'info');
  },

  success: function(message) {
    Materialize.toast(message, 3000, 'success');
  },

  warning: function(message) {
    Materialize.toast(message, 3000, 'warning');
  },

  error: function(message) {
    Materialize.toast(message, 3000, 'error');
  }

};