const express = require("express");
const router = express.Router();

// controller methods
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

router.get("/", getMovies);

router.post("/new", createMovie);

router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
