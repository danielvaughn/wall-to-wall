'use strict';

var Promise = require('bluebird'),
    mongoose = require('mongoose'),
    cryptoService = require('../services/crypto'),
    Schema = mongoose.Schema;
    Promise.promisifyAll(mongoose);

const MAX_LOGIN_ATTEMPTS = 5;

var UserSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  street: {type: String},
  unit: {type: String},
  city: {type: String},
  state: {type: String},
  zip: {type: String},
  credentials: {
    username: {type: String},
    password: {type: String, select: false},
    salt: {type: String, select: false},
    loginAttempts: {type: Number, required: true, default: 0, select: false}
  },

  toDoEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'ToDoEvent'}]

});


UserSchema.statics = {

  convert: {
    toInterface: function(user){
      
    },

    fromInterface: function(data){

    }
  },

  validate: function(data){
    return new Promise(function(resolve, reject){

      var errMessage;

      if (!data.firstName){
        errMessage = 'First name must be provided';
      }

      if (!data.lastName){
        errMessage = 'Last name must be provided';
      }

      if (!data.email){
        errMessage = 'Email must be provided';
      }

      if (!data.location){
        errMessage = 'Location must be provided';
      }

      if (data.location && !data.location.street){
        errMessage = 'Street address must be provided';
      }

      if (data.location && !data.location.city){
        errMessage = 'City must be provided';
      }

      if (data.location && !data.location.state){
        errMessage = 'State must be provided';
      }

      if (data.location && !data.location.zip){
        errMessage = 'Zip code must be provided';
      }

      if (!data.credentials){
        errMessage = 'Credentials must be provided';
      }

      if (data.credentials && !data.credentials.username){
        errMessage = 'Username must be provided';
      }

      if (data.credentials && !data.credentials.password){
        errMessage = 'Password must be provided';
      }

      if (errMessage){
        return reject(new Error(errMessage));
      } else {
        return resolve();
      }
    });
  },

  createNew: function(userData){
    return User.validate(userData)
      .then(function(){

        var pass = cryptoService.genPass(userData.credentials.password);

        userData.credentials.salt = pass.salt;
        userData.credentials.password = pass.hash;

        var user = new User(userData);

        return user.saveAsync();
      })
      .then(function(user){
        return Promise.resolve({
          _id: user[0]._id
        });
      })
      .catch(function(err){
        throw err;
      });
  }

};

UserSchema.methods = {

  authenticate: function authenticate(str){
    var salt = this.credentials.salt,
        password = this.credentials.password,
        user = this,
        authSuccess = false;

    return new Promise(function(resolve, reject){
      if (user.credentials.loginAttempts >= (MAX_LOGIN_ATTEMPTS - 1)){
        return reject(new Error('You have exceeded your max login attempts. Please try again later.'));
      }

      return resolve(cryptoService.authenticatePass(str, salt, password));
    })
    .then(function(success){
      authSuccess = success;

      if (authSuccess){
        user.credentials.loginAttempts = 0;
      } else {
        user.credentials.loginAttempts++;
      }

      return user.saveAsync();
    })
    .then(function(){
      if (authSuccess){
        return Promise.resolve();
      } else {
        return Promise.reject(new Error([
          'Incorrect password. You have ',
          MAX_LOGIN_ATTEMPTS - user.credentials.loginAttempts,
          ' attempts left.'
        ].join('')));
      }
    });
  }

};


var User = mongoose.model('User', UserSchema)
module.exports = User;
