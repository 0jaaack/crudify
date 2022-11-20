const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfiguration = require("../webpack.config");

const compiler = webpack(webpackConfiguration);
const server = new WebpackDevServer({ ...webpackConfiguration.devServer, open: true }, compiler);

const manage = async () => {
  console.log("start web server");

  await server.start();
};

module.exports = manage;
