//@ts-check

import { Document } from "mongoose";
import { Result } from "./interfaces-utils";

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
): Result {
  const total = Math.ceil(records / pageSize);

  const result = {
    data: db,
    pageSize: pageSize,
    pageNumber: pageNumber,
    total,
    records: records,
  };

  return result;
}

export function sortType(sort: string) {
  return sort === "asc" ? 1 : -1;
}
