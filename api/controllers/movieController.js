const axios = require("axios");
const MovieModel = require("../models/Movie");
const fetchAndStoreMovies = async (routeName) => {
  try {
    // Check if data for the specified routeName already exists in the database
    const existingMovies = await MovieModel.find({ routeName });

    // If data exists, return the stored data without making an API request
    if (existingMovies.length > 0) {
      return existingMovies;
    }

    // Define the API URL based on the selected route name
    let apiUrl = "";
    if (routeName === "Matrix") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix&apikey=720c3666";
    } else if (routeName === "Matrix Reloaded") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix%20Reloaded&apikey=720c3666";
    } else if (routeName === "Matrix Revolutions") {
      apiUrl = "http://www.omdbapi.com/?s=Matrix%20Revolutions&apikey=720c3666";
    }
    console.log(apiUrl);

    // Fetch data for the selected route
    const response = await axios.get(apiUrl);
    const responseData = response.data;
    const movies = responseData.Search;

    console.log(movies);

    const fetchedData = [];

    for (const movie of movies) {
      const existingMovie = await MovieModel.findOne({
        title: movie.Title,
        routeName: routeName, // Store the route name along with the movie
      });

      if (!existingMovie) {
        const newMovie = new MovieModel({
          title: movie.Title,
          year: movie.Year,
          routeName: routeName, // Store the route name
        });
        await newMovie.save();
        fetchedData.push(newMovie);
      }
    }

    return fetchedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchAndStoreMovies,
};
