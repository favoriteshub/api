const mongoose = require("mongoose");

let FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"]
  },
  country: {
    type: String,
    required: [true, "Please enter a country"]
  },
  poster: {
    type: String,
    required: false
  }
});

FilmSchema.pre("validate", function(next) {
  Film.find({title: this.title, country: this.country}, (err, docs) => {
    if (err || docs.length > 0) {
      this.invalidate("title", "Film already exists with that title");
    }
    next();
  });
});

const Film = mongoose.model("Film", FilmSchema);

module.exports = Film;
