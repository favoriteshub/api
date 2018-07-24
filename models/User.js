const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("User", UserSchema);
