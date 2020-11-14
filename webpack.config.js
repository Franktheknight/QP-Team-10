
var path = require('path');
module.exports = {
  mode: 'development',
  entry: './distiller/frontend/src/index.js',
  output: {
    path: path.join(__dirname, 'distiller/frontend/static/frontend'),
    filename: 'main.js'
  },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  }