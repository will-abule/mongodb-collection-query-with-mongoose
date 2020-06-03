const metaphone = require("metaphone");

function getOption(data) {
  return `$${data.option}`;
}

function getTypesStructuredValue(rules, res) {
  if (rules.field && rules.field === "sound") {
    const data = `/.*${metaphone(rules.data)}.*/i`;
    return eval(data);
  } else if (rules.option === "cn") {
    const data = `/.*${rules.data}.*/i`;
    return eval(data);
  } else if (rules.type !== undefined) {
    if (rules.type === "string") {
      return `${rules.data}`;
    } else if (rules.type === "number") {
      return parseInt(rules.data);
    } else if (rules.type === "float") {
      return parseFloat(rules.data);
    } else if (rules.type === "boolean") {
      return eval(rules.data) ? true : false;
    } else if (rules.type === "date") {
      return new Date(rules.data);
    }
  } else {
    return res
      .status(400)
      .send(
        "You've constructed your query wrongly kindly consult the documentation"
      );
  }
}

function getTypes(rules, res) {
  if (rules.field && rules.field === "sound") {
    const data = `/.*${metaphone(rules.data)}.*/i`;
    return { [rules.field]: eval(data) };
  } else if (rules.option === "cn") {
    const data = `/.*${rules.data}.*/i`;
    return { [rules.field]: eval(data) };
  } else if (rules.type !== undefined) {
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
    } else if (rules.type === "date") {
      return {
        [rules.field]: { [getOption(rules)]: new Date(rules.data) },
      };
    } else if (rules.type === "range") {
      if (
        !Array.isArray(rules.data) ||
        (Array.isArray(rules.data) && rules.data.length !== 2)
      ) {
        return res
          .status(400)
          .send("range should be an array with a min and max lenght of 2");
      }
      const range1 = rules.data[0];
      const range2 = rules.data[1];

      return {
        [rules.field]: {
          [getOption(range1)]: getTypesStructuredValue(range1, res),
          [getOption(range2)]: getTypesStructuredValue(range2, res),
        },
      };
    } else {
      return { [rules.field]: { [getOption(rules)]: rules.data } };
    }
  } else {
    return res
      .status(400)
      .send(
        "You've constructed your query wrongly kindly consult the documentation"
      );
  }
}

function query(query, res) {
  // structing for NOSQL query //

  const result = query.map((rules) => {
    if (rules.option === "expression") {
      return { [rules.field]: rules.data };
    } else {
      return getTypes(rules, res);
    }
  });

  console.log("result", result);

  return result;
}

module.exports = query;
