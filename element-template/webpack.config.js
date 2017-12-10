const path = require('path');
const name = '<%= tag %>';

module.exports = {
  entry: `./src/${name}.ts`,
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
    root: path.resolve(__dirname, 'src'),
    extensions: ['.tsx', '.ts', '.js'],
  },
};
