
const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Promise = require('bluebird');
    Promise.promisifyAll(mongoose);

const controller = {
  todo: require('../controllers/event-controller')
};

module.exports = function (app, config) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(express.static(config.root + '/public'));
  app.use('/api', router);

  router.post('/event', controller.todo.createEvent);

};
