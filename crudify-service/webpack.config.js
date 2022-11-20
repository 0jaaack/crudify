const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "dashboard", "src", "index"),
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dashboard", "public", "index")
    },
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist", "public"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "dashboard", "public", "index.html"),
    }),
  ]
};
