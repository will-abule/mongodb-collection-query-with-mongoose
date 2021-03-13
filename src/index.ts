import { Model, Document } from "mongoose";
import { QueryInterface, Response, Result } from "./utils/interfaces-utils";
import { searchFilter as validateSearch } from "./utils/search-filters-validation-utils";
import { filters } from "./utils/filters-validation-utils";
import { checkSort, sortType, pagination } from "./utils/shared-utils";
import { query as Query } from "./utils/query-utils";

export default async function getResReq(
  query: QueryInterface,
  DBModel: Model<Document>,
  select: string
): Promise<Response> {
  // checking for filters
  try {
    if (query.filter) {
      // checking for proper construction of searchFilters
      const _validateSearch = validateSearch(query);
      if (_validateSearch) return _validateSearch;

      if (query.searchFilters) {
        const searchFilter = JSON.parse(query.searchFilters);

        if (searchFilter.searchOption === "OR") {
          // constructing searchFilter rules to NoSQL query syntax' for OR

          const _query = searchFilter.rules;

          const result = Query(_query);

          if (!result) {
            return {
              type: "error",
              msg:
                "Your searchFilter.rules was not found Kindly consult the documentation",
            };
          }

          const _filters = filters(query);

          if (_filters) return _filters;

          const CheckSort = checkSort(query.sort);

          if (CheckSort === "none")
            return {
              type: "error",
              msg: "sort must be asc or desc",
            };

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .or(result)
            .sort([[query.sortName, sort]])
            .skip((query.pageNumber - 1) * query.pageSize * 1)
            .limit(query.pageSize * 1)
            .select(select);

          let records = await DBModel.find().or(result).countDocuments();

          const data: Result = pagination(
            dbData,
            query.pageSize,
            query.pageNumber,
            records
          );

          // response to client

          return {
            type: "success",
            data: data,
          };
        } else {
          // constructing searchFilter rules to NoSQL query syntax' for AND

          const _query = searchFilter.rules;

          const result = Query(_query);

          if (!result)
            return {
              type: "error",
              msg:
                "Your searchFilter.rules was not found Kindly consult the documentation",
            };
          const _filters = filters(query);

          if (_filters) return _filters;

          const CheckSort = checkSort(query.sort);

          if (CheckSort === "none")
            return {
              type: "error",
              msg: "sort must be asc or desc",
            };

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .and(result)
            .sort([[query.sortName, sort]])
            .skip((query.pageNumber - 1) * query.pageSize * 1)
            .limit(query.pageSize * 1)
            .select(select);

          let records = await DBModel.find().or(result).countDocuments();

          const data: Result = pagination(
            dbData,
            query.pageSize,
            query.pageNumber,
            records
          );

          // response to client

          return {
            type: "success",
            data: data,
          };

          // if (relatedDBModel.length > 0)
          //   dbData = queryRelatedDBdata(relatedDBModel, dbData);
        }
      } else {
        return {
          type: "error",
          msg: "searchFilters is required when filter is set to true",
        };
      }
    } else {
      // no filters

      // for pagination and sorting

      const _filters = filters(query);

      if (_filters) return _filters;

      const CheckSort = checkSort(query.sort);

      if (CheckSort === "none")
        return {
          type: "error",
          msg: "sort must be asc or desc",
        };

      const sort = sortType(CheckSort);

      let dbData = await DBModel.find()
        .sort([[query.sortName, sort]])
        .skip((query.pageNumber - 1) * query.pageSize * 1)
        .limit(query.pageSize * 1)
        .select(select);

      let records = await DBModel.countDocuments();

      const data: Result = pagination(
        dbData,
        query.pageSize,
        query.pageNumber,
        records
      );

      return {
        type: "success",
        data: data,
      };
    }
  } catch (error) {
    // console.log(error);
    return {
      type: "error",
      msg: JSON.stringify(error),
    };
  }
}
