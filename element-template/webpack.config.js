const path = require('path');

module.exports = {
  entry: './src/<%= tag %>.ts',
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '<%= tag %>.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
