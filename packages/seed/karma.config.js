module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript', 'sinon'],
    browsers: ['ChromeHeadless'],
    // TODO: Enable FirefoxHeadless again
    // browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    files: [{ pattern: 'src/*.ts' }, { pattern: 'test/*.ts' }],
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
        // TypeScript >=4.3 defaults this to true for esnext targets, which
        // breaks property accessors defined by the `@property()` decorator
        // when a class field initializer (e.g. `= 'default'`) is present.
        useDefineForClassFields: false,
        // Avoids duplicate identifier errors from vitest's bundled @types/chai
        // conflicting with the root @types/chai.
        skipLibCheck: true,
      },
      bundlerOptions: {
        transforms: [
          require('karma-typescript-es6-transform')({
            presets: ['@babel/preset-env'],
          }),
        ],
      },
    },
  });
};
