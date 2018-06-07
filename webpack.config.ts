import path from 'path';
import webpack from 'webpack';

const name = 'seed';

const config: webpack.Configuration = {
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
  resolve: {
    extensions: ['.js'],
  },
};

export default config;
