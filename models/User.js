const mongoose = require("mongoose");
const envConfig = require("../configuration/env.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  this.password = await bcrypt.hash(this.password, envConfig.salt_rounds);
});

UserSchema.methods.getJWT = function() {
  let token = jwt.sign({userId: this._id}, envConfig.jwt_encryption, {
    expiresIn: envConfig.jwt_expiration
  });
  return `Bearer ${token}`;
};

UserSchema.methods.comparePassword = async function(password) {
  let match = await bcrypt.compare(password, this.password);
  return match ? null : "The password does not match.";
};

module.exports = mongoose.model("User", UserSchema);
