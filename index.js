"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_filters_validation_utils_1 = require("./utils/search-filters-validation-utils");
const filters_validation_utils_1 = require("./utils/filters-validation-utils");
const shared_utils_1 = require("./utils/shared-utils");
const query_utils_1 = require("./utils/query-utils");
function getResReq(query, DBModel, select) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (query.filter) {
                const _validateSearch = search_filters_validation_utils_1.searchFilter(query);
                if (_validateSearch)
                    return _validateSearch;
                if (query.searchFilters) {
                    const searchFilter = JSON.parse(query.searchFilters);
                    if (searchFilter.searchOption.toUpperCase() === "OR") {
                        const result = query_utils_1.query(searchFilter);
                        if (!result) {
                            return {
                                type: "error",
                                msg: "Your searchFilter.rules was not found Kindly consult the documentation",
                            };
                        }
                        const _filters = filters_validation_utils_1.filters(query);
                        if (_filters)
                            return _filters;
                        const CheckSort = shared_utils_1.checkSort(query.sort);
                        if (CheckSort === "none")
                            return {
                                type: "error",
                                msg: "sort must be asc or desc",
                            };
                        const sort = shared_utils_1.sortType(CheckSort);
                        let dbData = yield DBModel.find()
                            .or(result)
                            .sort([[query.sortName, sort]])
                            .skip((query.pageNumber - 1) * query.pageSize * 1)
                            .limit(query.pageSize * 1)
                            .select(select);
                        let records = yield DBModel.find().or(result).countDocuments();
                        const data = shared_utils_1.pagination(dbData, query.pageSize, query.pageNumber, records);
                        return {
                            type: "success",
                            data: data,
                        };
                    }
                    else {
                        const result = query_utils_1.query(searchFilter);
                        if (!result)
                            return {
                                type: "error",
                                msg: "Your searchFilter.rules was not found Kindly consult the documentation",
                            };
                        const _filters = filters_validation_utils_1.filters(query);
                        if (_filters)
                            return _filters;
                        const CheckSort = shared_utils_1.checkSort(query.sort);
                        if (CheckSort === "none")
                            return {
                                type: "error",
                                msg: "sort must be asc or desc",
                            };
                        const sort = shared_utils_1.sortType(CheckSort);
                        let dbData = yield DBModel.find()
                            .and(result)
                            .sort([[query.sortName, sort]])
                            .skip((query.pageNumber - 1) * query.pageSize * 1)
                            .limit(query.pageSize * 1)
                            .select(select);
                        let records = yield DBModel.find().or(result).countDocuments();
                        const data = shared_utils_1.pagination(dbData, query.pageSize, query.pageNumber, records);
                        return {
                            type: "success",
                            data: data,
                        };
                    }
                }
                else {
                    return {
                        type: "error",
                        msg: "searchFilters is required when filter is set to true",
                    };
                }
            }
            else {
                const _filters = filters_validation_utils_1.filters(query);
                if (_filters)
                    return _filters;
                const CheckSort = shared_utils_1.checkSort(query.sort);
                if (CheckSort === "none")
                    return {
                        type: "error",
                        msg: "sort must be asc or desc",
                    };
                const sort = shared_utils_1.sortType(CheckSort);
                let dbData = yield DBModel.find()
                    .sort([[query.sortName, sort]])
                    .skip((query.pageNumber - 1) * query.pageSize * 1)
                    .limit(query.pageSize * 1)
                    .select(select);
                let records = yield DBModel.countDocuments();
                const data = shared_utils_1.pagination(dbData, query.pageSize, query.pageNumber, records);
                return {
                    type: "success",
                    data: data,
                };
            }
        }
        catch (error) {
            return {
                type: "error",
                msg: JSON.stringify(error),
            };
        }
    });
}
exports.default = getResReq;
//# sourceMappingURL=index.js.map