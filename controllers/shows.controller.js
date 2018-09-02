const Show = require("../models/Show");
const searchConfig = require("../configuration/search.json");
const {to, resErr, resSucc} = require("../services/response");

const newShow = async (req, res) => {
  if (!req.body.title) {
    return resErr(res, "Please enter a title");
  } else {
    let err, show;
    [err, show] = await to(Show.create(req.body).select("-__v"));

    if (err) {
      return resErr(res, "Show already exists with that title");
    }
    return resSucc(res, show);
  }
};

const searchByTitleCount = async (req, res) => {
  let err, count;
  [err, count] = await to(Show.count({title: {$regex: req.params.title, $options: "i"}}));

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, {
    count,
    pages: Math.ceil(count / searchConfig.elementsPerPage)
  });
};

const searchByTitlePaged = async (req, res) => {
  let elementsPerPage = searchConfig.elementsPerPage;
  let err, shows;
  [err, shows] = await to(
    Show.find({title: {$regex: req.params.title, $options: "i"}})
      .sort({title: 1})
      .skip(elementsPerPage * req.params.page)
      .limit(elementsPerPage)
  );

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, shows);
};

const getOne = async (req, res) => {
  let err, show;
  [err, show] = await to(Show.findById(req.params.id));

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, show);
};

const updateOne = async (req, res) => {
  let err, updatedShow;
  [err, updatedShow] = await to(Show.updateOne({_id: req.params.id}, req.body));

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, updatedShow);
};

module.exports = {newShow, searchByTitleCount, searchByTitlePaged, getOne, updateOne};
