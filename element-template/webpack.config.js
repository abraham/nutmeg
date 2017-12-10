const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const name = '<%= tag %>';

module.exports = {
  devtool: 'source-map',
  entry: {
    [`${name}.bundled`]: path.resolve(__dirname, 'dist', `${name}.js`),
    [`${name}.min`]: path.resolve(__dirname, 'dist', `${name}.js`),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ecma: 7,
      },
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
