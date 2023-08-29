// models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  imdbID: String,
  Type: String,
  Poster: String,
  routeName: String,
  posterID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poster", // Reference to the Poster model
  },
});

module.exports = mongoose.model("Movie", movieSchema);
