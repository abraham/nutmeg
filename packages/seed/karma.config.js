module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript', 'sinon'],
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    files: [
      './node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce.js',
      { pattern: 'src/*.ts' },
      { pattern: 'test/*.ts' },
    ],
    reporters: ['progress', 'karma-typescript'],
    singleRun: true,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity,
    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        target: 'esnext',
        lib: ['esnext', 'dom'],
      },
      bundlerOptions: {
        transforms: [require('karma-typescript-es6-transform')({ presets: 'env' })],
      },
    },
  });
}
