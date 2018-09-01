const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

const deleteUser = async (req, res) => {
  let user, err;
  [err, user] = await to(User.deleteOne({_id: req.user._id}));

  if (err) {
    return resErr(res, "Could not delete user");
  }
  return resSucc(res);
};

module.exports = {deleteUser};
