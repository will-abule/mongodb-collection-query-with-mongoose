const Query = require("./utils/query-function");
const {
  checkSort,
  sortType,
  pagination,
} = require("../shared/shared-function");
const filter = require("./utils/filters-validation-function");
const validateSearch = require("./utils/search-filters-validation-function");

async function getResReqSocket(io, reqQuery, DBModel, select) {
  // checking for filters

  try {
    if (reqQuery.filter === undefined) {
      return (() => {
        for (const client of reqQuery.client) {
          io.to(client.id).emit("error", {
            status: 400,
            message:
              "filter was not provided, make sure filter is either set to true or false",
          });
        }
      })();
    } else {
      if (reqQuery.filter === true) {
        // checking for proper construction of searchFilters

        validateSearch(io, reqQuery);
        const searchFilter = JSON.parse(reqQuery.searchFilters);

        if (searchFilter.searchOption === "OR") {
          // constructing searchFilter rules to NoSQL query syntax's for OR

          const query = searchFilter.rules;

          const result = Query(query, io, reqQuery);

          filter(reqQuery, io);

          const CheckSort = checkSort(reqQuery.sort);

          if (CheckSort === "none")
            return (() => {
              for (const client of reqQuery.client) {
                io.to(client.id).emit("error", {
                  status: 400,
                  message: `sort must be asc or desc`,
                });
              }
            })();

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .or(result)
            .sort([[reqQuery.sortName, sort]])
            .skip((reqQuery.pageNumber - 1) * reqQuery.pageSize * 1)
            .limit(reqQuery.pageSize * 1)
            .select(select);

          let records = await DBModel.find().or(result).countDocuments();

          const data = pagination(
            dbData,
            reqQuery.pageSize,
            reqQuery.pageNumber,
            records
          );

          // response to client

          return data;
        } else {
          // constructing searchFilter rules to NoSQL query syntax's for AND

          const query = searchFilter.rules;

          const result = Query(query, io, reqQuery);

          filter(reqQuery, io);

          const CheckSort = checkSort(reqQuery.sort);

          if (CheckSort === "none")
            res.status(400).send(`sort must be asc or desc`);

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .and(result)
            .sort([[reqQuery.sortName, sort]])
            .skip((reqQuery.pageNumber - 1) * reqQuery.pageSize * 1)
            .limit(reqQuery.pageSize * 1)
            .select(select);

          let records = await DBModel.find().and(result).countDocuments();

          // if (relatedDBModel.length > 0)
          //   dbData = queryRelatedDBdata(relatedDBModel, dbData);

          const data = pagination(
            dbData,
            reqQuery.pageSize,
            reqQuery.pageNumber,
            records
          );

          // response to client

          return data;
        }
      } else {
        // no filters

        // for pagination and sorting

        filter(reqQuery, io);

        const CheckSort = checkSort(reqQuery.sort);

        if (CheckSort === "none")
          return res.status(400).send(`sort must be asc or desc`);

        const sort = sortType(CheckSort);

        let dbData = await DBModel.find()
          .sort([[reqQuery.sortName, sort]])
          .skip((reqQuery.pageNumber - 1) * reqQuery.pageSize * 1)
          .limit(reqQuery.pageSize * 1)
          .select(select);

        let records = await DBModel.countDocuments();

        const data = pagination(
          dbData,
          reqQuery.pageSize,
          reqQuery.pageNumber,
          records
        );

        // response to client

        return data;
      }
    }
  } catch (error) {
    // console.log(error);
    let data = {
      type: "error",
      data: error,
    };
    return data;
  }
}

module.exports = getResReqSocket;
