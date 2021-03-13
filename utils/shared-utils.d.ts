import { Document } from "mongoose";
import { Result } from "./interfaces-utils";
export declare function checkSort(sort: string): "none" | "desc" | "asc";
export declare function pagination(db: Document[], pageSize: number, pageNumber: number, records: number): Result;
export declare function sortType(sort: string): 1 | -1;
