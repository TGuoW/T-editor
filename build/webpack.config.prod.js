const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const path = require('path');


module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../src/index.ts'),
  mode: 'production'
})