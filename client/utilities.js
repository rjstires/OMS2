var Toastr = require('toastr');

export const Toast = {

  info: function(message) {
    Toastr.info(message);
  },

  success: function(message) {
    Toastr.success(message);
  },

  warning: function(message) {
    Toastr.warning(message);
  },

  error: function(message) {
    Toastr.error(message);
  }

};