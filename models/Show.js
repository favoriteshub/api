const mongoose = require("mongoose");

let ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    required: false
  },
  last_aired: {
    type: Number,
    required: false
  },
  last_seen: {
    type: Number,
    required: false
  },
  poster: {
    type: String,
    required: false,
    default: "http://via.placeholder.com/170x250"
  }
});

module.exports = mongoose.model("Show", ShowSchema);
