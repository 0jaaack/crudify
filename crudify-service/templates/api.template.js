const apiTemplate = (collectionName) => {
  return (
    [
      {
        url: `/api/${collectionName}`,
        type: "create",
        method: "POST",
        permission: "notAllowed"
      },
      {
        url: `/api/${collectionName}/:contentId`,
        type: "findOne",
        method: "GET",
        permission: "notAllowed"
      },
      {
        url: `/api/${collectionName}`,
        type: "find",
        method: "GET",
        permission: "notAllowed"
      },
      {
        url: `/api/${collectionName}/:contentId`,
        type: "update",
        method: "PUT",
        permission: "notAllowed"
      },
      {
        url: `/api/${collectionName}/:contentId`,
        type: "delete",
        method: "DELETE",
        permission: "notAllowed"
      }
    ]
  );
};

module.exports = apiTemplate;
