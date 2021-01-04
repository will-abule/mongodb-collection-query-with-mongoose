function filters(reqQuery, io) {
  if (reqQuery.pageSize === undefined)
    return (() => {
      for (const client of reqQuery.client) {
        io.to(client.id).emit("error", {
          status: 400,
          message: `pageSize not provided! Please provide it as a query params.`,
        });
      }
    })();

  if (reqQuery.pageNumber === undefined)
    return (() => {
      for (const client of reqQuery.client) {
        io.to(client.id).emit("error", {
          status: 400,
          message: `pageNumber not provided! Please provide it as a query params.`,
        });
      }
    })();

  if (reqQuery.sort === undefined)
    return (() => {
      for (const client of reqQuery.client) {
        io.to(client.id).emit("error", {
          status: 400,
          message: `sort not provided! Please provide it as a query params.`,
        });
      }
    })();

  if (reqQuery.sortName === undefined)
    return (() => {
      for (const client of reqQuery.client) {
        io.to(client.id).emit("error", {
          status: 400,
          message: `sortName not provided! Please provide it as a query params..`,
        });
      }
    })();
}

module.exports = filters;
