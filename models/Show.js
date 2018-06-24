const mongoose = require('mongoose');

let ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  last_aired: {
    type: Number,
    required: true
  },
  last_seen: {
    type: Number,
    required: true
  },
  poster: {
    type: String,
    required: false,
    default: "http://via.placeholder.com/170x250"
  },
});

module.exports = mongoose.model('Show', ShowSchema);
