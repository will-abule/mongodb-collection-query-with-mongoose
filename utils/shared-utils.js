"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortType = exports.pagination = exports.checkSort = exports.formatDate = void 0;
const moment_1 = __importDefault(require("moment"));
const formatDate = (date = new Date()) => {
    return `${moment_1.default(new Date(date)).format("YYYY-MM-DD HH:mm:ss")}`;
};
exports.formatDate = formatDate;
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