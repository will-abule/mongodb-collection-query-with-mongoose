function filters(req, res) {
  if (req.query.pageSize === undefined)
    res
      .status(400)
      .send(`pageSize not provided! Please provide it as a query params.`);

  if (req.query.pageNumber === undefined)
    res
      .status(400)
      .send(`pageNumber not provided! Please provide it as a query params.`);

  if (req.query.sort === undefined)
    res
      .status(400)
      .send(`sort not provided! Please provide it as a query params.`);

  if (req.query.sortName === undefined)
    res
      .status(400)
      .send(`sortName not provided! Please provide it as a query params..`);
}

module.exports = filters;
