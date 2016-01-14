var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, 'static/js'),
    filename: 'bundle.js',
    publicPath: '/static/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
    //new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
      }, {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include:  __dirname
      }
    ]
  }
}

