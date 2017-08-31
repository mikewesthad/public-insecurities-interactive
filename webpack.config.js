const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader" },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { modules: true, sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ]
        })
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "src/index.html" }),
    new ExtractTextPlugin("[name].[contenthash].css"),
    new CopyWebpackPlugin([{ from: "./src/images", to: "images/" }])
  ],
  devServer: {
    historyApiFallback: true
  }
};
