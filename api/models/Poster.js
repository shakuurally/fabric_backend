const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", // Reference to the Movie model
  },
  posterURL: String,
});

module.exports = mongoose.model("Poster", posterSchema);
