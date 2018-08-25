const mongoose = require("mongoose");
const serverConfig = require("../configuration/server.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {to, ThrowErr} = require("../services/response");

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  library: {
    shows: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Show"
      }
    ]
  }
});

UserSchema.pre("save", async function() {
  let err, salt, hash;
  [err, salt] = await to(bcrypt.genSalt(10));

  if (err) {
    ThrowErr(err.message, true);
  }
  [err, hash] = await to(bcrypt.hash(this.password, salt));

  if (err) {
    ThrowErr(err.message, true);
  }
  this.password = hash;
});

UserSchema.methods.getJWT = function() {
  let token = jwt.sign({user: this._id}, serverConfig.jwt_encryption, {
    expiresIn: serverConfig.jwt_expiration
  });
  return `Bearer ${token}`;
};

UserSchema.methods.comparePassword = async function(password) {
  let match = await bcrypt.compare(password, this.password);

  return match ? null : "The password does not match.";
};

module.exports = mongoose.model("User", UserSchema);
