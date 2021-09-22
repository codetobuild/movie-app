const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const { response } = require("express");

const getGenres = async (req, res) => {
  const genres = await Genre.find({});
  res.status(200).json(genres);
};

const createGenre = async (req, res) => {
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.status(201).json(genre);
};

exports.getGenres = getGenres;
exports.createGenre = createGenre;
