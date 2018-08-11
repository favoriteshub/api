const {to} = require("await-to-js");
const pe = require("parse-error");

const awaitTo = async (promise) => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

const ReErr = function(res, err, code) {
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json({success: false, error: err});
};

const ReSucc = function(res, data, code) {
  let send_data = {success: true};

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);
};

const ThrowErr = function(err_message, log) {
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};

module.exports = {to: awaitTo, ReErr, ReSucc, ThrowErr};
