'use strict';

var Util = {

  mongoRegExp: function mongoRegExp(str){
    return new RegExp('^' + this.escapeRegExp(str) + '$', 'g');
  },

  escapeRegExp: function escapeRegExp(str){
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

};
