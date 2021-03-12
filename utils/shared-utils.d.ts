import { Document } from "mongoose";
export declare function checkSort(sort: string): "none" | "desc" | "asc";
export declare function pagination(db: Document[], pageSize: number, pageNumber: number, records: number): {
    data: Document[];
    pageSize: number;
    pageNumber: number;
    total: number;
    records: number;
};
export declare function sortType(sort: string): 1 | -1;
