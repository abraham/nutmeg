const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const name = 'element';

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, '.'),
  },
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
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
