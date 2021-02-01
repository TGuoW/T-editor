const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../demo/index.ts'),
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
})