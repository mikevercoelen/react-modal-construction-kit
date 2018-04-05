const webpack = require('webpack')

const env = process.env.NODE_ENV

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

module.exports = config
