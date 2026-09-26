module.exports = function (config) {
  config.set({
    basePath: process.env['INIT_CWD'],
    frameworks: ['mocha', 'chai', 'karma-typescript', 'sinon'],
    browsers: ['ChromeHeadless'],
    files: [
      { pattern: 'test/*.test.ts' },
      {
        pattern: 'test/**/*.json',
        watched: true,
        served: true,
        included: false,
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
      '**/*.ts': ['karma-typescript'],
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        target: 'esnext',
        lib: ['dom', 'esnext'],
        // TypeScript >=4.3 defaults this to true for esnext targets, which
        // breaks property accessors defined by the `@property()` decorator
        // when a class field initializer (e.g. `= 'default'`) is present.
        useDefineForClassFields: false,
      },
      bundlerOptions: {
        transforms: [
          require('karma-typescript-es6-transform')({ presets: 'env' }),
        ],
      },
    },
  });
};
