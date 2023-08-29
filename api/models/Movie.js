const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  imdbID: String,
  Type: String,
  Poster: String,
  routeName: String, // Add a field to store the route name
});

module.exports = mongoose.model("Movie", movieSchema);
