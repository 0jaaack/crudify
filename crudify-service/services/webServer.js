const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../webpack.config");

class WebServerService {
  constructor() {
    this.compiler = webpack(webpackConfig);
    this.webServer = new WebpackDevServer(webpackConfig.devServer, this.compiler);
  }

  start() {
    return this.webServer.start();
  }
}

module.exports = WebServerService;
