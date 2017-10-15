var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nyc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nyc-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nyc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nyc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nyc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nyc-production'
  }
};

module.exports = config[env];
