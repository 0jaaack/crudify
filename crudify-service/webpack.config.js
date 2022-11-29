const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "dashboard", "src", "index"),
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dashboard", "public"),
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "jsx",
              target: "es2015",
            }
          }
        ],
        exclude: (modulePath) => (
          /node_modules/.test(modulePath)
          && !/node_modules\/crudify-service/.test(modulePath)
        )
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dashboard", "public", "index.html")
    },
    compress: true,
    port: 7286,
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "dashboard", "public", "index.html"),
    })
  ].filter(Boolean)
};
