
const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    Promise = require('bluebird');
    Promise.promisifyAll(mongoose);

const controller = {
  todo: require('../controllers/event-controller')
};

module.exports = function (app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(express.static(config.root + '/public'));
  app.use('/api', router);

  router.post('/event', controller.todo.createEvent);

};
