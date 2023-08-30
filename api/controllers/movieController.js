const axios = require("axios");
const MovieModel = require("../models/Movie");
const PosterModel = require("../models/Poster");

const fetchAndStoreMovies = async (routeName) => {
  try {
    // Define the API URL based on the selected route name
    let apiUrl = "";
    if (routeName === "Matrix") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix&apikey=720c3666";
    } else if (routeName === "Matrix Reloaded") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix%20Reloaded&apikey=720c3666";
    } else if (routeName === "Matrix Revolutions") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix%20Revolutions&apikey=720c3666";
    }

    // Fetch data for the selected route
    const response = await axios.get(apiUrl);
    const responseData = response.data;
    const movies = responseData.Search;

    for (const movie of movies) {
      // Check if the movie already exists in the database
      const existingMovie = await MovieModel.findOne({
        imdbID: movie.imdbID,
      });

      if (!existingMovie) {
        // Create a new Movie document
        const newMovie = new MovieModel({
          title: movie.Title,
          year: movie.Year,
          imdbID: movie.imdbID,
          routeName: routeName,
          Type: movie.Type,
        });

        // Check if the movie has a poster URL
        if (movie.Poster) {
          // Create a new Poster document
          const newPoster = new PosterModel({
            movieID: newMovie._id, // Link the poster to the movie
            posterURL: movie.Poster,
          });

          // Save the poster
          await newPoster.save();

          // Link the movie to the poster
          newMovie.posterID = newPoster._id;
        }

        // Save the movie
        await newMovie.save();
      } else if (!existingMovie.posterID && movie.Poster) {
        // If the movie has no poster but the fetched data has a poster URL
        // Create a new Poster document and link it to the existing movie
        const newPoster = new PosterModel({
          movieID: existingMovie._id,
          posterURL: movie.Poster,
        });

        // Save the poster
        await newPoster.save();

        // Link the existing movie to the poster
        existingMovie.posterID = newPoster._id;

        // Save the updated movie
        await existingMovie.save();
      }
    }

    // After storing the movies, you can fetch and return all movies with populated posterID
    const allMovies = await MovieModel.find().populate("posterID");

    return allMovies;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find().populate("posterID");

    res.json({
      message: "All movies fetched successfully",
      data: allMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  fetchAndStoreMovies,
  fetchAllMovies,
};
