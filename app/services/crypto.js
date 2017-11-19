'use strict';

var crypto = require('crypto');

var Crypto = {

  generateHex: function () {
    var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var hex = ''
    for (var i = 0, l = 6; i < l; i++) {
      hex += digits.charAt(Math.floor(Math.random() * digits.length))
    }
    return hex
  },

  genRandStr: function genRandStr(ln){
    return crypto.randomBytes(Math.ceil(ln/2))
      .toString('hex')
      .slice(0, ln);
  },

  shah512: function shah512(p, s){
    var hash = crypto.createHmac('sha512', s);
    hash.update(p);
    var val = hash.digest('hex');
    return val;
  },

  genPass: function genPass(p){
    var salt = this.genRandStr(16);
    var hash = this.shah512(p, salt);

    return {
      salt: salt,
      hash: hash
    }
  },

  authenticatePass: function authenticatePass(p, s, h){
    return this.shah512(p, s) === h;
  }

};

module.exports = Crypto;
