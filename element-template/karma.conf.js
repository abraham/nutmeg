module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'fixture', 'karma-typescript'],
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    files: [
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js',
      { pattern: 'src/*.ts' },
      { pattern: 'test/*.test.ts' },
      { pattern: 'test/fixture/*.html' },
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
      'test/fixture/**/*.html' : ['html2js'],
    },
    karmaTypescriptConfig: {
      compilerOptions: {
        target: 'es2017',
      },
      bundlerOptions: {
        transforms: [require("karma-typescript-es6-transform")({presets: 'es2015'})],
      }
    }
  });
}
