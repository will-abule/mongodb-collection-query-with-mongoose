const metaphone = require("metaphone");

function getOption(data) {
  return `$${data.option}`;
}

function getTypes(rules, res) {
  if (rules.field && rules.field === "sound") {
    const data = `/.*${metaphone(rules.data)}*/i`;
    return { [rules.field]: eval(data) };
  } else if (rules.option === "cn") {
    const data = `/.*${rules.data}*/i`;
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
    } else if (rules.type === "date") {
      return {
        [rules.field]: { [getOption(rules)]: new Date(rules.data) },
      };
    } else if (rules.type === "range") {
      if (
        !isArray(rules.data) ||
        (isArray(rules.data) && rules.data.length !== 2)
      ) {
        return res
          .status(400)
          .send("range should be an array with a min and max lenght of 2");
      }
      const range1 = rules.data[0];
      const range2 = rules.data[1];

      return {
        [rules.field]: {
          [getOption(range1)]: getTypes(range1),
          [getOption(range2)]: getTypes(range2),
        },
      };
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

  return result;
}

module.exports = query;
