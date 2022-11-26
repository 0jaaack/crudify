const mongoose = require("mongoose");
const FileService = require("crudify-service/services/file");
const { ids } = require("webpack");

const FIELD_TYPES = {
  text: String,
  number: Number,
  email: String,
  boolean: Boolean,
  date: String,
  list: Array
};
const fileService = new FileService();

async function loadModels(crudify) {
  const modelCollections = await fileService.getJsonFilesAll("models");

  modelCollections.forEach((collection) => {
    const schemaConfig = collection.data.reduce((config, field) => {
      if (field.type === "id") {
        return config;
      }

      const fieldConfig = {
        type: FIELD_TYPES[field.type],
        ...field.values
      };
      field.options?.map((option) => fieldConfig[option] = true);

      return Object.assign(config, { [field.name]: fieldConfig });
    }, {});

    const mongooseSchema = new mongoose.Schema(schemaConfig);
    const mongooseModel = mongoose.model(collection.name, mongooseSchema);

    crudify.models[collection.name] = mongooseModel;
  });
}

module.exports = loadModels;
