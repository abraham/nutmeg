const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Stylish = require('webpack-stylish');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env, argv) {
  const analyzer = env.analyzer;
  const production = env.production;
  const tag = env.tag;
  const workingDir = env.workingDir;
  let entry = {
    [`${tag}.bundled`]: path.resolve('dist', `${tag}.js`),
  };
  let plugins = [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        ecma: 6,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks: [`${tag}.bundled`],
    }),
    new Stylish(),
  ];

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (production) {
    entry[`${tag}.min`] = path.resolve('dist', `${tag}.js`);
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    mode: production ? 'production' : 'development',
    stats: 'none',
    context: workingDir,
    devServer: {
      contentBase: path.resolve(workingDir, '.'),
      hot: !production,
    },
    devtool: production ? 'source-map' : 'eval',
    entry: entry,
    output: {
      filename: '[name].js',
      path: path.resolve(workingDir, 'dist'),
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js'],
    },
  };
}
