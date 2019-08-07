function pagination(db, pageSize, pageNumber, records) {
  const Total = Math.ceil(records / pageSize);

  const result = {
    data: db,
    pageSize: parseInt(pageSize),
    pageNumber: parseInt(pageNumber),
    total: Total,
    records: records
  };

  return result;
}

module.exports = pagination;
