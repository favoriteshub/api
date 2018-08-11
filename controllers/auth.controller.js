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
      return ReErr(res, "user already exists with that username", 422);
    }
    return ReSucc(res, {message: "Successfully created new user.", user, token: user.getJWT()});
  }
};

module.exports = {createUser};
