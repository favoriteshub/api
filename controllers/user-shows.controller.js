const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

const getAll = async (req, res) => {
  let err, data;
  [err, data] = await to(
    User.findById(req.user._id)
      .select("library.shows")
      .populate({path: "library.shows", model: "Show"})
  );

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, data.library.shows);
};

const update = async (req, res) => {
  let post = {$push: {"library.shows": req.params.showId}};
  let del = {$pullAll: {"library.shows": [req.params.showId]}};
  let err, data;
  [err, data] = await to(User.updateOne({_id: req.user._id}, req.method === "POST" ? post : del));

  if (err) {
    return resErr(res, err);
  }
  return resSucc(res, data);
};

module.exports = {getAll, update};
