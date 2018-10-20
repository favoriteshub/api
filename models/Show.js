const mongoose = require("mongoose");

let ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"]
  },
  country: {
    type: String,
    required: [true, "Please enter a country"]
  },
  status: {
    type: String,
    required: false
  },
  seasons: {
    type: Number,
    required: false
  },
  poster: {
    type: String,
    required: false
  }
});

ShowSchema.pre("validate", function(next) {
  Show.find({title: this.title, country: this.country}, (err, docs) => {
    if (err || docs.length > 0) {
      this.invalidate("title", "Show already exists with that title");
    }
    next();
  });
});

const Show = mongoose.model("Show", ShowSchema);

module.exports = Show;
