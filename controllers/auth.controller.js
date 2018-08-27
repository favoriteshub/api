const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

const createUser = async (req, res) => {
  if (!req.body.username) {
    return resErr(res, "Please enter a username to register.");
  } else if (!req.body.password) {
    return resErr(res, "Please enter a password to register.");
  } else {
    let err, user;
    [err, user] = await to(User.create(req.body));

    if (err) {
      return resErr(res, "User already exists with that username", 422);
    }
    return resSucc(res, {user, token: user.getJWT()});
  }
};

const authUser = async (req, res) => {
  let err, user;
  if (!req.body.username) {
    return resErr(res, "Please enter a username to login.");
  } else if (!req.body.password) {
    return resErr(res, "Please enter a password to login.");
  } else {
    user = await User.findOne({username: req.body.username});

    if (!user) {
      return resErr(res, "Please enter an existing username.");
    }
  }

  err = await user.comparePassword(req.body.password);

  if (err) {
    return resErr(res, err, 422);
  }
  return resSucc(res, {user, token: user.getJWT()});
};

module.exports = {createUser, authUser};
