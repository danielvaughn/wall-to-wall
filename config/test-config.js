
const path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

const testConfig = {
  root: rootPath,
  app: {
    name: 'nyc'
  },
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/nyc-test'
};


module.exports = testConfig;
