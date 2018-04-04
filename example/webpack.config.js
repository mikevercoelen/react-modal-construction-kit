const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV

const rules = []

rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
})

const config = {
  context: __dirname,
  mode: 'development',
  entry: './index.js',
  module: {
    rules
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}

module.exports = config
