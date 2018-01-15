const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = function(env, argv) {
  const production = env.production;
  const tag = env.tag;
  const workingDir = env.workingDir;
  let entry = {
    [`${tag}.bundled`]: path.resolve('dist', `${tag}.js`),
    [`${tag}.min`]: path.resolve('dist', `${tag}.js`),
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
    new webpack.NamedModulesPlugin(),
  ];

  if (!production) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    context: workingDir,
    devServer: {
      contentBase: path.resolve(workingDir, '.'),
      hot: true,
    },
    devtool: 'source-map',
    entry: entry,
    output: {
      filename: '[name].js',
      path: path.resolve(workingDir, 'dist'),
    },
    plugins: plugins,
    resolve: {
      extensions: ['.js'],
    },
  }
}
