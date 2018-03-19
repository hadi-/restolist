const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const autoprefixer = require("autoprefixer");

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

const browserConfig = {
  entry: "./src/browser/index.js",
  output: {
    path: path.resolve("./build"),
    filename: "[name].min.js"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "media/[name].[ext]",
          publicPath: url => url.replace(/build/, "")
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1, minimize: !isDev }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()]}
            }
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].css"
    }),
    // Setup global variables for client
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: isDev
    }),
    new SWPrecacheWebpackPlugin(
      {
        minify: true,
        cacheId: 'react-scratch',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'scratch-worker.js',
        maximumFileSizeToCacheInBytes: 4194304,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ],
  optimization: {
    minimize: !isDev,
    
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
    
  }
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: path.resolve("./build"),
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "media/[name].[ext]",
          publicPath: url => url.replace(/build/, ""),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader/locals"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react"] }
      }
    ]
  },
  optimization: {
    minimize: !isDev
  }
};

module.exports = [browserConfig, serverConfig];