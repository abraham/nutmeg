const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ecma: 7,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
