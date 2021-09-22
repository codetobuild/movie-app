import React, { Component } from "react";
import queryString from "query-string";
import { toast } from "react-toastify";
import Form from "./common/form";
import { saveMovie, getMovie } from "../movieAPI/fakeMovieService";
// import Input from "./common/input";
import Joi from "joi-browser";
import { genres, getGenres } from "../movieAPI/fakeGenreService";
import { getBackendGenres } from "../services/genreService";
import {
  createMovie,
  getBackendMovie,
  updateMovie,
} from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    genreId: "",
    genres: [],
    errors: {},
    update: false,
  };
  handleSave = () => {
    this.props.history.push("/movies");
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required().label("genre"),
    numberInStock: Joi.number().min(0).max(50).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };

  async doUpdate(data) {
    const movieId = this.props.match.params.id;
    await updateMovie(movieId, data);
  }
  async doSubmit() {
    const { data } = this.state;
    // const moviePayload = saveMovie(data);
    if (this.state.update) {
      this.doUpdate(data);
      toast.success("movie updated successfully");
    } else {
      this.setState({ update: false });
      await createMovie(data);
      toast.success("movie created successfully!");
    }
    this.handleSave();
  }

  populateMovie = (movie) => {
    const data = { ...this.state.data };
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;

    return data;
  };

  async componentDidMount() {
    const { data: genres } = await getBackendGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") {
      return;
    }
    const { data: movie } = await getBackendMovie(movieId);
    if (!movie) {
      return this.props.history.replace("/not-found");
    }
    // update movie
    this.setState({ update: true });

    const data = this.populateMovie(movie);
    this.setState({ data: data });
  }

  render() {
    const { genres, errors, data } = this.state;
    const formButtonLabel = this.state.update ? "Update" : "Save";
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", errors.genreId, genres, data)}
        {this.renderInput("numberInStock", "Number in stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}
        {this.renderSubmitButton(`${formButtonLabel}`)}
      </form>
    );
  }
}

export default MovieForm;
