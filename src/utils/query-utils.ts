import { Response, QueryInterface, Rule, Rules } from "./interfaces-utils";
const metaphone = require("metaphone");

function getOption(data: any): string {
  return `$${data.option}`;
}

function getObject(obj: any): any {
  let data: any = {};

  for (const option in obj) {
    if (option === "ne") {
      data.$ne = obj[option];
    }
    if (option === "eq") {
      data.$eq = obj[option];
    }
    if (option === "gt") {
      data.$gt = obj[option];
    }
    if (option === "gte") {
      data.$gte = obj[option];
    }
    if (option === "lt") {
      data.$lt = obj[option];
    }
    if (option === "lte") {
      data.$lte = obj[option];
    }
  }

  return data;
}

function getTypesStructuredValue(
  rules: Rules
): string | number | Float32Array | boolean | Date | Response {
  if (typeof rules.type !== "undefined") {
    if (rules.type === "string") {
      return `${rules.data}`;
    } else if (rules.type === "number") {
      return parseInt(rules.data);
    } else if (rules.type === "float") {
      return parseFloat(rules.data);
    } else if (rules.type === "boolean") {
      return eval(rules.data) ? true : false;
    } else if (rules.type === "date") {
      return new Date(`${rules.data}`);
    } else {
      return {
        type: "error",
        msg:
          "range can only accept the following types string, number, float, boolean and date",
      };
    }
  } else {
    return {
      type: "error",
      msg:
        "You've constructed your query wrongly kindly consult the documentation",
    };
  }
}

function escapeSpecialCharacters(value: string): string {
  // escape special characters in mongodb like "/"
  return `/.*${`${value}`.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}.*/i`;
}

function getTypes(rules: Rules): Rule {
  if (rules.field && rules.field === "sound") {
    const data = escapeSpecialCharacters(`${metaphone(rules.data)}`);
    return { [rules.field]: eval(data) };
  } else if (rules.option === "cn") {
    const data = escapeSpecialCharacters(`${rules.data}`);
    return { [rules.field]: eval(data) };
  } else if (rules.option === "in" || rules.option === "nin") {
    return {
      [rules.field]: { [getOption(rules)]: rules.data },
    };
  } else if (rules.type) {
    if (rules.type === "string") {
      return { [rules.field]: { [getOption(rules)]: `${rules.data}` } };
    } else if (rules.type === "number") {
      return {
        [rules.field]: { [getOption(rules)]: parseInt(rules.data) },
      };
    } else if (rules.type === "float") {
      return {
        [rules.field]: { [getOption(rules)]: parseFloat(rules.data) },
      };
    } else if (rules.type === "boolean") {
      return {
        [rules.field]: { [getOption(rules)]: eval(rules.data) ? true : false },
      };
    } else if (rules.type === "plainArray") {
      if (rules.option === "all") {
        return {
          [rules.field]: { $all: rules.data },
        };
      } else {
        return {
          [rules.field]: rules.data,
        };
      }
    } else if (rules.type === "objectArray") {
      return {
        [rules.field]: getObject(rules.data),
      };
    } else if (rules.type === "date") {
      return {
        [rules.field]: { [getOption(rules)]: new Date(`${rules.data}`) },
      };
    } else if (rules.type === "range") {
      const range1 = rules.data[0];
      const range2 = rules.data[1];

      return {
        [rules.field]: {
          [getOption(range1)]: getTypesStructuredValue(range1),
          [getOption(range2)]: getTypesStructuredValue(range2),
        },
      };
    } else {
      return { [rules.field]: { [getOption(rules)]: rules.data } };
    }
  } else {
    return {
      type: "error",
      msg:
        "You've constructed your query wrongly kindly consult the documentation",
    };
  }
}

export function query(query: QueryInterface): Rule[] | undefined {
  // structuring Mongodb query result will look like this [{ name: /*will*/i, date : $gte: some_date }] //
  let result;
  if (query.rules) {
    result = query.rules.map((rules) => {
      if (rules.option === "expression") {
        return { [rules.field]: rules.data };
      } else {
        return getTypes(rules);
      }
    });
  }

  return result;
}
