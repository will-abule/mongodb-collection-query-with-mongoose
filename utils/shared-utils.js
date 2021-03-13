"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortType = exports.pagination = exports.checkSort = void 0;
function checkSort(sort) {
    if (sort.toLowerCase() === "asc") {
        return "asc";
    }
    else if (sort.toLowerCase() === "desc") {
        return "desc";
    }
    else {
        return "none";
    }
}
exports.checkSort = checkSort;
function pagination(db, pageSize, pageNumber, records) {
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
exports.pagination = pagination;
function sortType(sort) {
    return sort === "asc" ? 1 : -1;
}
exports.sortType = sortType;
//# sourceMappingURL=shared-utils.js.map