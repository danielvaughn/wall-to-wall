'use strict';

var Promise = require('bluebird'),
    User = require('../model/UserModel'),
    Notification = require('../model/NotificationModel'),
    _ = require('lodash');

const UserController = {

  createUser: function createUser(req, res){
    var body = req.body;

    User.createNew(body.user)
      .then(function(user){
        res.status(200).send({user: user});
      })
      .catch(function(err){
        res.status(500).send({error: err.message});
      });
  },

  authenticate: function authenticate(req, res){
    var body = req.body,
        user = req.user;

    return user.authenticate(body.password)
      .then(function(){
        res.status(200).send({status: 'success'});
      })
      .catch(function(err){
        res.status(401).send({status: 'unauthorized', error: err.message});
      });
  }

};

module.exports = UserController;
