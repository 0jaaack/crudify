const WebServerService = require("../services/webServer");

const manage = async () => {
  const webServer = new WebServerService();
  await webServer.start();
};

module.exports = manage;
