const FileService = require("../../services/file");
const dashboardRouter = require("../routes/dashboard");

async function loadRouters(crudify) {
  const fileService = new FileService();
  const apiCollections = await fileService.getJsonFilesAll("apis");
  const generateHttpMethod = (method, ...args) => {
    switch(method) {
      case "GET":
        return crudify.app.get(...args);
      case "POST":
        return crudify.app.post(...args);
      case "PUT":
        return crudify.app.put(...args);
      case "DELETE":
        return crudify.app.delete(...args);
      default:
        return;
    }
  };
  const generateRoute = (type, model) => {
    switch (type) {
      case "create":
        return async (req, res) => {
          const document = await model.create(req.body);
          return res.json({ result: document });
        };
      case "findOne":
        return async (req, res) => {
          const { contentId } = req.params;
          const document = await model.findById(contentId).lean();

          return res.json({ result: document });
        };
      case "find":
        return async (req, res) => {
          const documents = await model.find({}).lean();
          return res.json({ result: documents });
        };
      case "update":
        return async (req, res) => {
          const { contentId } = req.params;
          await model.findByIdAndUpdate(contentId, req.body);

          return res.json({ result: "ok" });
        };
      case "delete":
        return async (req, res) => {
          const { contentId } = req.params;
          await model.findByIdAndRemove(contentId);

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

      const model = crudify.models[collection.name];

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
