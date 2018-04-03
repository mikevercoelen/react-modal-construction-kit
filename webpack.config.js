const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = process.env.NODE_ENV
const isExample = env === 'example'

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
}

const reactDOMExternall = {
  root: 'ReactDom',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
}

const propTypesExternal = {
  root: 'PropTypes',
  commonjs2: 'prop-types',
  commonjs: 'prop-types',
  amd: 'prop-types'
}

const classNamesExternal = {
  root: 'classnames',
  commonjs2: 'classnames',
  commonjs: 'classnames',
  amd: 'classnames'
}

const transitionGroupExternal = {
  root: 'ReactTransitionGroup',
  commonjs2: 'react-transition-group',
  commonjs: 'react-transition-group',
  amd: 'react-transition-group'
}

const rules = []

rules.push({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
})

const config = {
  mode: env,
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternall,
    'prop-types': propTypesExternal,
    'classnames': classNamesExternal,
    'react-transition-group': transitionGroupExternal
  },
  module: {
    rules
  },
  output: {
    library: 'ReactModalConstructionKit',
    libraryTarget: 'umd'
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (isExample) {
  config.entry = './example/index.js'
  config.plugins.push(new HtmlWebpackPlugin({
    template: './example/index.html'
  }))
  config.mode = 'development'
  delete config.externals
  config.module.rules.push({
    test: /\.scss$/,
    use: [{
      loader: "style-loader" // creates style nodes from JS strings
    }, {
      loader: "css-loader" // translates CSS into CommonJS
    }, {
      loader: "sass-loader" // compiles Sass to CSS
    }]
  })
}

module.exports = config
