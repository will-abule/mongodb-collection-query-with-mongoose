import { Response, QueryInterface } from "./interfaces-utils";

export function filters(query: QueryInterface): Response | undefined {
  if (!query.pageSize || typeof query.pageSize !== "string") {
    return {
      type: "error",
      msg: "pageSize not provided! Please provide it as a query params.",
    };
  } else if (!query.pageNumber || typeof query.pageNumber !== "string") {
    return {
      type: "error",
      msg: "pageNumber not provided! Please provide it as a query params.",
    };
  } else if (!query.sort || typeof query.sort !== "string") {
    return {
      type: "error",
      msg: "sort not provided! Please provide it as a query params.",
    };
  } else if (!query.sortName || typeof query.sortName !== "string") {
    return {
      type: "error",
      msg: "sortName not provided! Please provide it as a query params.",
    };
  } else {
    return undefined;
  }
}
