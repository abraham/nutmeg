const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    build: './src/build.ts',
    main: './src/main.ts',
    new: './src/new.ts',
    serve: './src/serve.ts',
    watch: './src/watch.ts',
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /element-template/,
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: [
      /node_modules/,
      /dist/,
    ]
  }
};
