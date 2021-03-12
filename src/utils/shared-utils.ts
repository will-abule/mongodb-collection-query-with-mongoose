//@ts-check

import { Document } from "mongoose";

export function checkSort(sort: string) {
  if (sort === "asc") {
    return "asc";
  } else if (sort === "desc") {
    return "desc";
  } else {
    return "none";
  }
}

export function pagination(
  db: Document[],
  pageSize: number,
  pageNumber: number,
  records: number
) {
  const Total = Math.ceil(records / pageSize);

  const result = {
    data: db,
    pageSize: pageSize,
    pageNumber: pageNumber,
    total: Total,
    records: records,
  };

  return result;
}

export function sortType(sort: string) {
  return sort === "asc" ? 1 : -1;
}