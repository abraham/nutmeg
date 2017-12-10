const path = require('path');
const name = '<%= tag %>';

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', `${name}.ts`),
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
    filename: `${name}.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
