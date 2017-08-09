/* globals process */
/* globals __dirname */

const webpack = require('webpack');
const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV,
  isDev = ENV === 'dev';

const devRules = [
  // {
  //   test: /\.scss$/,
  //   loader: ExtractTextPlugin.extract({
  //     fallback: 'style-loader',
  //     use: [
  //       {
  //         loader: 'css-loader',
  //         options: {
  //           importLoaders: true,
  //           sourceMap: true
  //         }
  //       },
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           sourceMap: 'inline',
  //           plugins: function() {
  //             if (isDev) {
  //               return;
  //             } else {
  //               return [require('autoprefixer'), require('cssnano')];
  //             }
  //           }
  //         }
  //       },
  //       {
  //         loader: 'sass-loader',
  //         options: {
  //           sourceMap: true
  //         }
  //       }
  //     ]
  //   })
  // }
];
const productionRules = devRules.concat([
  {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  }
]);
const devPlugins = [
  // new ExtractTextPlugin({
  //   filename: isDev ? 'main.css' : 'main.min.css',
  //   allChunks: true
  // }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common'
  // })
];
const productionPlugins = devPlugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    mangle: false
  })//,
  // new CompressionPlugin({
  //   asset: '[path].gz[query]',
  //   algorithm: 'gzip',
  //   test: /\.(js|html|css)$/,
  //   threshold: 10240,
  //   minRatio: 0.8
  // })
]);

module.exports = {
  entry: {
    script: './src/script.js',
  },
  output: {
    filename: isDev ? '[name].js' : '[name].min.js',
    path: path.resolve(__dirname) + '/scripts/'
  },
  // module: {
  //   rules: isDev ? devRules : productionRules
  // },
  devtool: isDev ? 'source-map' : '',
  // plugins: isDev ? devPlugins : productionPlugins,
  watch: isDev
};
