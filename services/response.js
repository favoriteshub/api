const {to} = require("await-to-js");
const pe = require("parse-error");

const awaitTo = async (promise) => {
  let err, res;
  [err, res] = await to(promise);

  if (err) {
    return [pe(err), null];
  }
  return [null, res];
};

const resErr = function(res, err, code) {
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }

  if (typeof code !== "undefined") {
    res.statusCode = code;
  }

  return res.json({error: err, success: false});
};

const resSucc = function(res, data, code) {
  if (typeof code !== "undefined") {
    res.statusCode = code;
  }

  return res.json({...data, success: true});
};

module.exports = {to: awaitTo, resErr, resSucc};
