//@ts-check

function checkSort(sort) {
  if (sort === "asc") {
    return "asc";
  } else if (sort === "desc") {
    return "desc";
  } else {
    return "none";
  }
}

function pagination(db, pageSize, pageNumber, records) {
  const Total = Math.ceil(records / pageSize);

  const result = {
    data: db,
    pageSize: parseInt(pageSize),
    pageNumber: parseInt(pageNumber),
    total: Total,
    records: records,
  };

  return result;
}

function sortType(sort) {
  return sort === "asc" ? 1 : -1;
}

module.exports = { checkSort, pagination, sortType };
