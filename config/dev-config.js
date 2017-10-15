
const path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

const devConfig = {
  root: rootPath,
  app: {
    name: 'nyc'
  },
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/nyc-development'
};


module.exports = devConfig;
