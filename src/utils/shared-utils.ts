//@ts-check

import { LeanDocument, Document } from "mongoose";
import { Result } from "./interfaces-utils";
import moment from "moment";

export const formatDate = (date = new Date()) => {
  return `${moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss")}`;
};

export function checkSort(sort: string) {
  if (sort.toLowerCase() === "asc") {
    return "asc";
  } else if (sort.toLowerCase() === "desc") {
    return "desc";
  } else {
    return "none";
  }
}

export function pagination(
  db: LeanDocument<Document>[],
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
