function searchFilter(req, res) {
  if (req.query.searchFilters === undefined)
    res
      .status(400)
      .send(
        "searchFilters was not provided, make sure searchFilters is an object with searchOption set to OR or AND and rules is an array of objects with each object containing field, option, and data "
      );

  const searchFilter = JSON.parse(req.query.searchFilters);

  if (searchFilter.searchOption === undefined)
    res
      .status(400)
      .send(
        "searchFilters was not structured properly, provide searchFilters.searchOption"
      );

  if (searchFilter.rules === undefined) {
    res
      .status(400)
      .send(
        "searchFilters was not structured properly, provide searchFilters.rules"
      );
  } else {
    if (Array.isArray(searchFilter.rules) === false) {
      res
        .status(400)
        .send(
          "searchOption.rules must be an array of objects with each object having a field, type, option and data should either AND or OR in upercase"
        );
    }
    searchFilter.rules.map(data => {
      if (
        data.type !== undefined &&
        data.type !== "string" &&
        data.type !== "number" &&
        data.type !== "float" &&
        data.type !== "date" &&
        data.type !== "boolean"
      ) {
        res
          .status(400)
          .send(
            "rules type must be set to 'string', 'number', 'float', 'date' or 'boolean'"
          );
      }
    });
  }

  if (searchFilter.searchOption !== "OR" && searchFilter.searchOption !== "AND")
    res.status(400).send("searchOption should either AND or OR in upercase");
}

module.exports = searchFilter;
