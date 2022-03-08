const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PUBLIC_ROUTE = './public/';
const SRC_ROUTE = './src/';

const JS_ROUTE = `${SRC_ROUTE}javascript/`;
const JS_PATH = `${JS_ROUTE}app.js`;

module.exports = {
  mode: 'production',
  entry: {
    main: [JS_PATH],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js'],
    alias: {
      '@Components': path.resolve(__dirname, `${JS_ROUTE}components`),
      '@Global': path.resolve(__dirname, `${JS_ROUTE}global`),
    },
  },

  devServer: {
    host: '0.0.0.0',
    port: '3000',
    hot: true,
    open: true,
    historyApiFallback: true,
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  output: {
    path: path.join(__dirname, 'bundle'),
    clean: true,
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js/,
        include: path.join(__dirname, JS_PATH),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: true },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${PUBLIC_ROUTE}index.html`,
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      linkType: 'text/css',
    }),
  ],
};
