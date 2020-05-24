const metaphone = require("metaphone");

function query(query) {
  // structing for NOSQL query //

  const result = query.map((rules) => {
    if (rules.option === "expression") {
      return { [rules.field]: rules.data };
    } else if (rules.option === "eq") {
      if (rules.type !== undefined) {
        if (rules.type === "string") {
          return { [rules.field]: { $eq: `${rules.data}` } };
        } else if (rules.type === "number") {
          return { [rules.field]: { $eq: parseInt(rules.data) } };
        } else if (rules.type === "float") {
          return { [rules.field]: { $eq: parseFloat(rules.data) } };
        } else if (rules.type === "date") {
          return { [rules.field]: { $eq: new Date(rules.data) } };
        } else {
          return { [rules.field]: { $eq: eval(rules.data) } };
        }
      } else {
        return { [rules.field]: { $eq: rules.data } };
      }
    } else if (rules.option === "gt") {
      if (rules.type !== undefined) {
        if (rules.type === "string") {
          return { [rules.field]: { $gt: `${rules.data}` } };
        } else if (rules.type === "number") {
          return { [rules.field]: { $gt: parseInt(rules.data) } };
        } else if (rules.type === "float") {
          return { [rules.field]: { $gt: parseFloat(rules.data) } };
        } else if (rules.type === "date") {
          return { [rules.field]: { $gt: new Date(rules.data) } };
        } else {
          return { [rules.field]: { $gt: eval(rules.data) } };
        }
      } else {
        return { [rules.field]: { $gt: rules.data } };
      }
    } else if (rules.option === "gte") {
      if (rules.type !== undefined) {
        if (rules.type === "string") {
          return { [rules.field]: { $gte: `${rules.data}` } };
        } else if (rules.type === "number") {
          return { [rules.field]: { $gte: parseInt(rules.data) } };
        } else if (rules.type === "float") {
          return { [rules.field]: { $gte: parseFloat(rules.data) } };
        } else if (rules.type === "date") {
          return { [rules.field]: { $gte: new Date(rules.data) } };
        } else {
          return { [rules.field]: { $gte: eval(rules.data) } };
        }
      } else {
        return { [rules.field]: { $gte: rules.data } };
      }
    } else if (rules.option === "lt") {
      if (rules.type !== undefined) {
        if (rules.type === "string") {
          return { [rules.field]: { $lt: `${rules.data}` } };
        } else if (rules.type === "number") {
          return { [rules.field]: { $lt: parseInt(rules.data) } };
        } else if (rules.type === "float") {
          return { [rules.field]: { $lt: parseFloat(rules.data) } };
        } else if (rules.type === "date") {
          return { [rules.field]: { $lt: new Date(rules.data) } };
        } else {
          return { [rules.field]: { $lt: eval(rules.data) } };
        }
      } else {
        return { [rules.field]: { $lt: rules.data } };
      }
    } else if (rules.option === "lte") {
      if (rules.type !== undefined) {
        if (rules.type === "string") {
          return { [rules.field]: { $lte: `${rules.data}` } };
        } else if (rules.type === "number") {
          return { [rules.field]: { $lte: parseInt(rules.data) } };
        } else if (rules.type === "float") {
          return { [rules.field]: { $lte: parseFloat(rules.data) } };
        } else if (rules.type === "date") {
          return { [rules.field]: { $lte: new Date(rules.data) } };
        } else {
          return { [rules.field]: { $lte: eval(rules.data) } };
        }
      } else {
        return { [rules.field]: { $lte: rules.data } };
      }
    } else if (rules.option === "cn") {
      const data = "/.*" + rules.data + ".*/i";
      return { [rules.field]: eval(data) };
    } else if (rules.field === "sound") {
      const data = "/.*" + metaphone(rules.data) + ".*/i";
      return { [rules.field]: eval(data) };
    }
  });

  return result;
}

module.exports = query;
