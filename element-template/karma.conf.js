module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'fixture', 'karma-typescript'],
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    files: [
      {
        pattern: 'test/*.test.ts',
        watched: false,
      },
      {
        pattern: 'test/fixture/**/*',
      },
    ],
    reporters: ['progress', 'karma-typescript'],
    singleRun: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity,
    preprocessors: {
      'test/**/*.test.ts': ['karma-typescript'],
      'test/fixture/**/*.fixture.html' : ['html2js'],
    },
  });
}
