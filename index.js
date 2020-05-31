const Query = require("./utils/query-function");
const checkSort = require("./utils/check-sort-function");
const sortType = require("./utils/sort-type-function");
const pagination = require("./utils/pagination-function");
const filter = require("./utils/filters-validation-function");
const search = require("./utils/search-filters-function");

async function getResReq(req, res, DBModel, select) {
  // checking for filters

  try {
    if (req.query.filter === undefined) {
      res.status(400);
      res.send(
        "filter was not provided, make sure filter is eitheir set to true or false"
      );
    } else {
      if (req.query.filter === "true") {
        // checking for proper construction of searchFilters

        search(req, res);
        const searchFilter = JSON.parse(req.query.searchFilters);

        if (searchFilter.searchOption === "OR") {
          // constructing searchFilter rules to NoSQL query syntacs for OR

          const query = searchFilter.rules;

          const result = Query(query, res);

          filter(req, res);

          const CheckSort = checkSort(req.query.sort);

          if (CheckSort === "none")
            res.status(400).send(`sort must be asc or desc`);

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .or(result)
            .sort([[req.query.sortName, sort]])
            .skip((req.query.pageNumber - 1) * req.query.pageSize * 1)
            .limit(req.query.pageSize * 1)
            .select(select);

          let records = await DBModel.find().or(result).countDocuments();

          const data = pagination(
            dbData,
            req.query.pageSize,
            req.query.pageNumber,
            records
          );

          // response to client

          return data;
        } else {
          // constructing searchFilter rules to NoSQL query syntacs for AND

          const query = searchFilter.rules;

          const result = Query(query, res);

          filter(req, res);

          const CheckSort = checkSort(req.query.sort);

          if (CheckSort === "none")
            res.status(400).send(`sort must be asc or desc`);

          const sort = sortType(CheckSort);

          let dbData = await DBModel.find()
            .and(result)
            .sort([[req.query.sortName, sort]])
            .skip((req.query.pageNumber - 1) * req.query.pageSize * 1)
            .limit(req.query.pageSize * 1)
            .select(select);

          let records = await DBModel.find().and(result).countDocuments();

          // if (relatedDBModel.length > 0)
          //   dbData = queryRelatedDBdata(relatedDBModel, dbData);

          const data = pagination(
            dbData,
            req.query.pageSize,
            req.query.pageNumber,
            records
          );

          // response to client

          return data;
        }
      } else {
        // no filters

        // for pagination and sorting

        filter(req, res);

        const CheckSort = checkSort(req.query.sort);

        if (CheckSort === "none")
          res.status(400).send(`sort must be asc or desc`);

        const sort = sortType(CheckSort);

        let dbData = await DBModel.find()
          .sort([[req.query.sortName, sort]])
          .skip((req.query.pageNumber - 1) * req.query.pageSize * 1)
          .limit(req.query.pageSize * 1)
          .select(select);

        let records = await DBModel.countDocuments();

        const data = pagination(
          dbData,
          req.query.pageSize,
          req.query.pageNumber,
          records
        );

        // response to client

        return data;
      }
    }
  } catch (error) {
    let data = {
      type: "error",
      data: error,
    };
    return data;
  }
}

module.exports = getResReq;
