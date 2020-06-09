function searchFilter(req, res) {
  if (req.query.searchFilters === undefined)
    return res
      .status(400)
      .send(
        "searchFilters was not provided, make sure searchFilters is an object with searchOption set to 'OR' or 'AND' and rules is an array of objects with each object containing field, option, and data "
      );

  const searchFilter = JSON.parse(req.query.searchFilters);

  if (searchFilter.searchOption === undefined)
    return res
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
      return res
        .status(400)
        .send(
          "searchOption.rules must be an array of objects with each object having a field, type, option and data should either 'AND' or 'OR' in upercase"
        );
    }

    for (const data of searchFilter.rules) {
      if (
        !data.field ||
        data.field === undefined ||
        !(data.field && typeof data.field === "string")
      ) {
        return res
          .status(400)
          .send("rules field is required and must be set to 'string'");
      }

      if (
        !data.type ||
        data.type === undefined ||
        !(
          data.type &&
          (data.type === "string" ||
            data.type === "number" ||
            data.type === "float" ||
            data.type === "date" ||
            data.type === "boolean" ||
            data.type === "expression" ||
            data.type === "range")
        )
      ) {
        return res
          .status(400)
          .send(
            "rules type must be set to 'string', 'number', 'float', 'date' or 'boolean' or 'expression' or 'range'"
          );
      }

      if (
        (!data.option && data.type !== "range") ||
        (data.option === undefined && data.type !== "range") ||
        !(
          data.option === "cn" ||
          data.option === "ne" ||
          data.option === "eq" ||
          data.option === "gt" ||
          data.option === "gte" ||
          data.option === "lt" ||
          data.option === "lte" ||
          data.option === "nin" ||
          data.option === "in"
        )
      ) {
        return res
          .status(400)
          .send(
            "rules option must be set to 'cn', 'ne', 'eq', 'gt', 'gte', 'lt', 'lte', 'nin', and 'in'"
          );
      }

      if (data.type === "string" && typeof data.data !== "string") {
        return res
          .status(400)
          .send("rules type is set to 'string' rules but data is not a string");
      } else if (data.type === "number" && typeof data.data !== "number") {
        return res
          .status(400)
          .send("rules type is set to 'number' rules but data is not a number");
      } else if (
        data.type === "float" &&
        data.data.toString().indexOf(".") != -1
      ) {
        return res
          .status(400)
          .send("rules type is set to 'float' rules but data is not a floaf");
      } else if (data.type === "date" && !Date.parse(`${data.data}`)) {
        return res
          .status(400)
          .send("rules type is set to 'date' rules but data is not a date");
      } else if (data.type === "boolean" && typeof data.data !== "boolean") {
        return res
          .status(400)
          .send(
            "rules type is set to 'boolean' rules but data is not a boolean"
          );
      } else if (data.type === "range" && !Array.isArray(data.data)) {
        return res
          .status(400)
          .send("rules type is set to 'range' rules but data is not a array");
      } else if (
        data.type === "range" &&
        Array.isArray(data.data) &&
        data.data.length !== 2
      ) {
        return res
          .status(400)
          .send(
            "rules type is set to 'range' and rules data is an array but is not of length 2"
          );
      } else if (data.type === "range") {
        const range1 = data.data[0];
        const range2 = data.data[1];

        if (
          range1.option &&
          range2.option &&
          !(
            range1.option === "eq" ||
            range1.option === "ne" ||
            range1.option === "gt" ||
            range1.option === "gte" ||
            range1.option === "lt" ||
            range1.option === "lte"
          ) &&
          !(
            range2.option === "eq" ||
            range2.option === "ne" ||
            range2.option === "gt" ||
            range2.option === "gte" ||
            range2.option === "lt" ||
            range2.option === "lte"
          )
        )
          return res
            .status(400)
            .send(
              "range range.data array should be an object with an option field which only accept eq, ne, gt, gte, lt and lte"
            );
      }

      if (data.option === "in" && !Array.isArray(data.data)) {
        return res
          .status(400)
          .send("rules option must is set to 'in' but is not an array");
      } else if (data.option === "in" && Array.isArray(data.data)) {
        for (const d of data.data) {
          if (
            !(
              typeof d === "string" ||
              typeof data.data === "number" ||
              !Date.parse(`${data.data}`) ||
              data.data.toString().indexOf(".") != -1
            )
          ) {
            return res
              .status(400)
              .send(
                "rules option must is set to 'in' and rules data is an array must be either a 'string', 'number', 'float' and 'date'"
              );
          }
        }
      }

      if (data.option === "nin" && !Array.isArray(data.data)) {
        return res
          .status(400)
          .send("rules option must is set to 'nin' but is not an array");
      } else if (data.option === "nin" && Array.isArray(data.data)) {
        for (const d of data.data) {
          if (
            !(
              typeof d === "string" ||
              typeof data.data === "number" ||
              !Date.parse(`${data.data}`) ||
              data.data.toString().indexOf(".") != -1
            )
          ) {
            return res
              .status(400)
              .send(
                "rules option must is set to 'nin' and rules data is an array must be either a 'string', 'number', 'float' and 'date'"
              );
          }
        }
      }
    }
  }

  if (searchFilter.searchOption !== "OR" && searchFilter.searchOption !== "AND")
    return res
      .status(400)
      .send("searchOption should either 'AND' or 'OR' in upercase");
}

module.exports = searchFilter;
