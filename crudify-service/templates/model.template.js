const modelTemplate = (collectionName) => {
  return (
    [
      {
        type: "id",
        name: `${collectionName}Id`,
        options: ["unique"]
      }
    ]
  );
};

module.exports = modelTemplate;
