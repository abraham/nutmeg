module.exports = function(config) {
  config.set({
    basePath: process.env['INIT_CWD'],
    frameworks: ['mocha', 'chai', 'karma-typescript', 'sinon'],
    browsers: ['ChromeHeadless'],
    files: [
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js',
      { pattern: 'dist/*.bundled.js' },
      { pattern: 'test/*.test.ts' },
      { pattern: 'test/**/*.json', watched: true, served: true, included: false },
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
        lib: ['dom', 'esnext'],
      },
      bundlerOptions: {
        transforms: [require('karma-typescript-es6-transform')({ presets: 'env' })],
      },
    },
  });
}
