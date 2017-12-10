const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const name = '<%= tag %>';

module.exports = {
  devtool: 'source-map',
  entry: {
    [`${name}`]: path.resolve(__dirname, 'src', `${name}.ts`),
    [`${name}.min`]: path.resolve(__dirname, 'src', `${name}.ts`),
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
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
        warnings: true,
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
