const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    hot: true,
    liveReload: true,
    watchFiles: ["./src/**/*.html"],
  },
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Test for image files
        use: [
          {
            loader: "file-loader", // Use file-loader to copy images to the output directory
            options: {
              name: "images/[name].[ext]", // Output directory and naming convention
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // File types for fonts
        use: [
          {
            loader: "file-loader", // Use file-loader to copy font files to output
            options: {
              name: "fonts/[name].[ext]", // Directory structure and file naming
            },
          },
        ],
      },
    ],
  },
};
