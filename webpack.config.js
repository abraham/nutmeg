const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

const name = 'seed';

module.exports = {
  mode: 'production',
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
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
