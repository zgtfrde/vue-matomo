const webpack = require('webpack');
const TerserPlugin = require( 'terser-webpack-plugin' );
const pkg = require('../package.json')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.js',

  optimization:{
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        terserOptions: {
          ie8: false,
          mangle: true,
          output: {
            comments: false,
          },
        }
      })
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${pkg.name}.js`,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      lib: path.resolve(__dirname, '../src/lib'),
      directives: path.resolve(__dirname, '../src/directives')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['blue'],
          babelrc: false
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader'
          }
        }
      }
    ]
  }
}
