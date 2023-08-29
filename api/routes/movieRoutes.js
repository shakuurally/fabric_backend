const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/fetch-matrix", async (req, res) => {
  try {
    const data = await movieController.fetchAndStoreMovies("Matrix");
    res.json({
      message: "Data fetched and stored successfully for Matrix",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/fetch-all", (req, res) =>
  movieController.fetchAllMovies(req, res)
);

router.get("/fetch-matrix-reloaded", async (req, res) => {
  try {
    const data = await movieController.fetchAndStoreMovies("Matrix Reloaded");
    res.json({
      message: "Data fetched and stored successfully for Matrix Reloaded",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/fetch-matrix-revolutions", async (req, res) => {
  try {
    const data = await movieController.fetchAndStoreMovies(
      "Matrix Revolutions"
    );
    res.json({
      message: "Data fetched and stored successfully for Matrix Revolutions",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
