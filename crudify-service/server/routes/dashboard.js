const FileService = require("crudify-service/services/file");
const express = require("express");
const router = express.Router();

const fileService = new FileService();
const apiTemplate = require("crudify-service/templates/api.template");
const modelTemplate = require("crudify-service/templates/model.template");

router.get("/health", (req, res) => {
  return res.json({ data: "ok" });
});

router.get("/collections", async (req, res) => {
  const collections = await fileService.getCollections();
  return res.json({ data: collections });
});

router.post("/collections", async (req, res) => {
  const { name } = req.body;

  try {
    const { data: crudifyConfig } = await fileService.getJsonFile("config", "crudify.json");
    const newCrudifyConfig = Object.assign(crudifyConfig, {
      collections: crudifyConfig.collections?.concat(name) ?? [name]
    });

    await fileService.updateJsonFile("config", "crudify", newCrudifyConfig);
    await fileService.updateJsonFile("apis", name, apiTemplate(name));
    await fileService.updateJsonFile("models", name, modelTemplate(name));

    return res.json({ data: "success" });
  } catch (error) {
    console.error(error);
  }
});

router.get("/models", async (req, res) => {
  const { collection } = req.query;
  const models = await fileService.getJsonFilesAll("models");

  if (!!collection) {
    const model = models.find((model) => model.name === collection);
    return res.json({ data: model });
  }

  return res.json({ data: models });
});

router.put("/models", async (req, res) => {
  const { model, types } = req.body;
  await fileService.updateJsonFile("models", model, types);

  return res.json({ data: "success" });
});

router.get("/apis", async (req, res) => {
  const { collection } = req.query;
  const apis = await fileService.getJsonFilesAll("apis");

  if (!!collection) {
    const api = apis.find((api) => api.name === collection);
    return res.json({ data: api });
  }

  return res.json({ data: apis });
});

router.put("/apis", async (req, res) => {
  const { api, endpoints } = req.body;
  await fileService.updateJsonFile("apis", api, endpoints);

  return res.json({ data: "success" });
});

module.exports = router;
