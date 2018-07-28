const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
