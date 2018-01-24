const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'src/js/app.js'),
  output: {
    path: path.join(__dirname, 'app/assets/js'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
