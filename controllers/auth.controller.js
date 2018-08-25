const User = require("../models/User");
const {to, ReErr, ReSucc} = require("../services/response");

const createUser = async (req, res) => {
  if (!req.body.username) {
    return ReErr(res, "Please enter a username to register.");
  } else if (!req.body.password) {
    return ReErr(res, "Please enter a password to register.");
  } else {
    let err, user;
    [err, user] = await to(User.create(req.body));

    if (err) {
      return ReErr(res, "User already exists with that username", 422);
    }
    return ReSucc(res, {user, token: user.getJWT()});
  }
};

const authUser = async (req, res) => {
  let err, user;
  if (!req.body.username) {
    return ReErr(res, "Please enter a username to login.");
  } else if (!req.body.password) {
    return ReErr(res, "Please enter a password to login.");
  } else {
    user = await User.findOne({username: req.body.username});

    if (!user) {
      return ReErr(res, "Please enter an existing username.");
    }
  }

  err = await user.comparePassword(req.body.password);

  if (err) {
    return ReErr(res, err, 422);
  }
  return ReSucc(res, {user, token: user.getJWT()});
};

module.exports = {createUser, authUser};
