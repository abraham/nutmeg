var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = undefined;

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'fixture'],
    browsers: ['ChromeHeadless'],
    files: [
      {
        pattern: 'test/*.test.js',
        watched: false,
      },
      {
        pattern: 'test/fixture/**/*',
      },
    ],
    reporters: ['progress'],
    singleRun: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity,
    preprocessors: {
      'test/**/*.test.js': ['webpack'],
      'test/fixture/**/*.fixture.html' : ['html2js'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
  });
}
