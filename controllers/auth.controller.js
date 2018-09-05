const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");
const jwt = require("jsonwebtoken");

const newUser = async (req, res) => {
  if (!req.body.username) {
    return resErr(res, "Please enter a username to register");
  } else if (!req.body.password) {
    return resErr(res, "Please enter a password to register");
  } else {
    let err, user;
    [err, user] = await to(User.create(req.body));

    if (err) {
      return resErr(res, "User already exists with that username");
    }
    return resSucc(
      res,
      {username: user.username, email: user.email},
      {token: user.getJWT(), refreshToken: user.getJWT(true)}
    );
  }
};

const login = async (req, res) => {
  let err, user;
  if (!req.body.username) {
    return resErr(res, "Please enter a username to login");
  } else if (!req.body.password) {
    return resErr(res, "Please enter a password to login");
  } else {
    user = await User.findOne({username: req.body.username});

    if (!user) {
      return resErr(res, "Please enter an existing username");
    }
  }

  err = await user.comparePassword(req.body.password);

  if (err) {
    return resErr(res, err);
  }
  return resSucc(
    res,
    {username: user.username, email: user.email},
    {token: user.getJWT(), refreshToken: user.getJWT(true)}
  );
};

const refreshToken = async (req, res) => {
  let oldToken = jwt.decode(req.body.token);

  jwt.verify(req.body.refreshToken, process.env.REFRESH_JWT_ENCRYPTION, async (err, decoded) => {
    if (err) {
      return resErr(res, err);
    } else if (oldToken.iat === decoded.iat) {
      let err, user;
      [err, user] = await to(User.findById(decoded.userId));

      if (err) {
        return resErr(res, err);
      }
      return resSucc(res, undefined, {token: user.getJWT(), refreshToken: user.getJWT(true)});
    } else {
      return resErr(res, err);
    }
  });
};

module.exports = {newUser, login, refreshToken};
