const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      path.join(__dirname, '/source/assets/js/app.js'),
      path.join(__dirname, '/source/assets/css/app.scss')
    ]
  },
  output: {
    filename: 'assets/js/[name].js'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'source', 'assets'),
      path.join(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: "source"
          }
        }]
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css.scss',
    }),

    // This shit doesn't work yet. No idea why.
    new PurgecssPlugin({
      paths: glob.sync([
        './source/**/*.html',
        './source/**/*.erb',
        './source/**/*.js'
      ]),
      extractors: [{
        extractor: TailwindExtractor,
        extensions: ['html', 'js', 'erb'],
        only: 'bundle'
      }],
      nodir: true
    })
  ]
};