const FileService = require("../../services/file");
const dashboardRouter = require("../routes/dashboard");

async function loadRouters(crudify) {
  const fileService = new FileService();
  const apiCollections = await fileService.getJsonFilesAll("apis");
  const generateHttpMethod = (method, ...args) => {
    switch(method) {
      case "get":
        return crudify.app.get(...args);
      case "post":
        return crudify.app.post(...args);
      case "put":
        return crudify.app.put(...args);
      case "delete":
        return crudify.app.delete(...args);
      default:
        return;
    }
  };
  const generateRoute = (api) => {
    switch (api.type) {
      case "create":
        return async (req, res) => {
          await model.create(req.body);
          return res.json({ result: "ok" });
        };
      case "find":
        return async (req, res) => {
          const { id } = req.params;
          const document = await model.findById(id).lean();

          return res.json({ result: document });
        };
      case "findAll":
        return async (req, res) => {
          const documents = await model.find({}).lean();
          return res.json({ result: documents });
        };
      case "update":
        return async (req, res) => {
          const { id } = req.params;
          await model.findByIdAndUpdate(id, req.body);

          return res.json({ result: "ok" });
        };
      case "delete":
        return async (req, res) => {
          const { id } = req.params;
          await model.findByIdAndRemove(id);

          return res.json({ result: "ok" });
        };
      default:
        return;
    }
  }

  apiCollections.forEach((collection) => {
    collection.data.forEach((api) => {
      if (api.permission === "notAllowed") {
        return;
      }

      const model = crudify.models[api.type];
      generateHttpMethod(
        api.method,
        api.url,
        generateRoute(api.type, model)
      );
    });
  });

  crudify.app.use("/_dashboard", dashboardRouter);
}

module.exports = loadRouters;
