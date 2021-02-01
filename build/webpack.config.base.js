const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.svg'],
  },
  module: {
    rules: [{
      test: /\.(ts|js)$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'ts-loader',
      }],
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../demo'),
      ],
      exclude: [
        '/node_modules/',
      ],
    }, {
      test: /\.svg/,
      loader: 'raw-loader',
    }, {
      test: /\.css/,
      use: ['style-loader', 'css-loader'],
    }]
  }
}
