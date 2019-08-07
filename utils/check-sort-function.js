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

module.exports = checkSort;
