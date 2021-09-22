const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");

const getMovies = async (req, res) => {
  const movies = await Movie.find({});
  console.log(movies);
  res.json(movies);
};

const getMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.status(200).json(movie);
};

const createMovie = async (req, res) => {
  console.log(req.body);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).json({ message: "Invalid genre." });

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    //    publishDate: moment().toJSON(),
  });
  movie = await movie.save();

  res.status(201).json(movie);
};

const updateMovie = async (req, res) => {
  console.log("update control");
  console.log(req.body);
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.json(movie);
};

const deleteMovie = async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.json(movie);
};

exports.deleteMovie = deleteMovie;
exports.getMovies = getMovies;
exports.getMovie = getMovie;
exports.createMovie = createMovie;
exports.updateMovie = updateMovie;
