
var express = require('express'),
    config = require('./config').getConfig(),
    glob = require('glob'),
    mongoose = require('mongoose'),
    router = require('./app/router');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

// wire up controllers
router(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

module.exports = app;
