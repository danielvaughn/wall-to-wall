var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    baseConfig = require('./base-config'),
    devConfig = require('./dev-config'),
    testConfig = require('./test-config'),
    prodConfig = require('./prod-config'),
    _ = require('lodash'),
    env = process.env.NODE_ENV || 'development';

var config = {

  getConfig: function(){
    var configObj = baseConfig;

    switch (env) {
      case 'development':
        configObj = _.assign(configObj, devConfig);
        break;
      case 'test':
        configObj = _.assign(configObj, testConfig);
        break;
      case 'production':
        configObj = _.assign(configObj, prodConfig);
        break;
      default:
        configObj = _.assign(configObj, devConfig);
        break;
    }

    return configObj;
  }

};

module.exports = config;
