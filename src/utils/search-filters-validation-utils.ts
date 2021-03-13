import { Response, QueryInterface } from "./interfaces-utils";

export function searchFilter(query: QueryInterface): Response | undefined {
  // validating query.searchFilters in order to generate the proper mongodb query
  if (!query.searchFilters)
    return {
      status: 400,
      type: "error",
      msg:
        "searchFilters was not provided, make sure searchFilters is an object with searchOption set to 'OR' or 'AND' and rules is an array of objects with each object containing field, option, and data ",
    };

  const searchFilter = JSON.parse(query.searchFilters);

  if (typeof searchFilter.searchOption === "undefined")
    return {
      status: 400,
      type: "error",
      msg:
        "searchFilters was not structured properly, provide searchFilters.searchOption",
    };

  if (typeof searchFilter.rules === "undefined")
    return {
      status: 400,
      type: "error",
      msg:
        "searchFilters was not structured properly, provide searchFilters.rules",
    };

  if (Array.isArray(searchFilter.rules) === false)
    return {
      status: 400,
      type: "error",
      msg:
        "searchOption.rules must be an array of objects with each object having a field, type, option and data should either 'AND' or 'OR' in uppercase",
    };

  for (const data of searchFilter.rules) {
    if (!data.field || !(data.field && typeof data.field === "string")) {
      return {
        status: 400,
        type: "error",
        msg: "rules field is required and must be set to 'string'",
      };
    }

    if (
      !data.type ||
      !(
        data.type &&
        (data.type === "string" ||
          data.type === "number" ||
          data.type === "float" ||
          data.type === "date" ||
          data.type === "boolean" ||
          data.type === "expression" ||
          data.type === "plainArray" ||
          data.type === "objectArray" ||
          data.type === "range")
      )
    ) {
      return {
        status: 400,
        type: "error",
        msg:
          "rules type must be set to 'string', 'number', 'float', 'date' or 'boolean' or 'expression' or 'range' or 'plainArray' or 'objectArray' or 'arraySingle'",
      };
    }

    if (
      (!data.option &&
        !(data.type === "range" || data.type === "objectArray")) ||
      (data.option &&
        !(
          data.option === "cn" ||
          data.option === "ne" ||
          data.option === "eq" ||
          data.option === "gt" ||
          data.option === "gte" ||
          data.option === "lt" ||
          data.option === "lte" ||
          data.option === "nin" ||
          data.option === "in" ||
          data.option === "all"
        ))
    ) {
      return {
        status: 400,
        type: "error",
        msg:
          "rules option must be set to 'cn', 'ne', 'eq', 'gt', 'gte', 'lt', 'lte', 'nin', 'in' and for plainArray 'all'",
      };
    }

    if (data.type === "string" && typeof data.data !== "string") {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'string' rules but data is not a string",
      };
    } else if (data.type === "number" && typeof data.data !== "number") {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'number' rules but data is not a number",
      };
    } else if (
      data.type === "float" &&
      data.data.toString().indexOf(".") != -1
    ) {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'float' rules but data is not a float",
      };
    } else if (data.type === "date" && !Date.parse(`${data.data}`)) {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'date' rules but data is not a date",
      };
    } else if (data.type === "boolean" && typeof data.data !== "boolean") {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'boolean' rules but data is not a boolean",
      };
    } else if (
      data.type === "plainArray" &&
      !(Array.isArray(data.data) || typeof data.data === "string")
    ) {
      return {
        status: 400,
        type: "error",
        msg:
          "rules type is set to 'plainArray' rules but data is not an array or a string",
      };
    } else if (data.type === "objectArray" && typeof data.data !== "object") {
      return {
        status: 400,
        type: "error",
        msg:
          "rules type is set to 'objectArray' rules but data is not an object",
      };
    } else if (data.type === "objectArray" && typeof data.data === "object") {
      for (const option in data.data) {
        if (
          !(
            option === "ne" ||
            option === "eq" ||
            option === "gt" ||
            option === "gte" ||
            option === "lt" ||
            option === "lte"
          )
        ) {
          return {
            status: 400,
            type: "error",
            msg:
              "if rules type is set to 'objectArray' each field in the object should be 'ne', 'eq', 'gt', 'gte', 'lt', and 'lte'",
          };
        }
      }
    } else if (data.type === "range" && !Array.isArray(data.data)) {
      return {
        status: 400,
        type: "error",
        msg: "rules type is set to 'range' rules but data is not a array",
      };
    } else if (
      data.type === "range" &&
      Array.isArray(data.data) &&
      data.data.length !== 2
    ) {
      return {
        status: 400,
        type: "error",
        msg:
          "rules type is set to 'range' and rules data is an array but is not of length 2",
      };
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
        return {
          status: 400,
          type: "error",
          msg:
            "range range.data array should be an object with an option field which only accept eq, ne, gt, gte, lt and lte",
        };
    }

    if (data.option === "in" && !Array.isArray(data.data)) {
      return {
        status: 400,
        type: "error",
        msg: "rules option must is set to 'in' but is not an array",
      };
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
          return {
            status: 400,
            type: "error",
            msg:
              "rules option must is set to 'in' and rules data is an array must be either a 'string', 'number', 'float' and 'date'",
          };
        }
      }
    }

    if (data.option === "nin" && !Array.isArray(data.data)) {
      return {
        status: 400,
        type: "error",
        msg: "rules option must is set to 'nin' but is not an array",
      };
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
          return {
            status: 400,
            type: "error",
            msg:
              "rules option must is set to 'nin' and rules data is an array must be either a 'string', 'number', 'float' and 'date'",
          };
        }
      }
    }
  }

  if (
    searchFilter.searchOption.toUpperCase() !== "OR" &&
    searchFilter.searchOption.toUpperCase() !== "AND"
  )
    return {
      status: 400,
      type: "error",
      msg: "searchOption should either 'AND' or 'OR' in uppercase",
    };

  return undefined;
}
