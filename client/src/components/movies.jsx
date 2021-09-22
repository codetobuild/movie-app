import React, { Component } from "react";
// import { getMovies } from "../movieAPI/fakeMovieService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
// import { getGenres } from "../movieAPI/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
// import { deleteMovie } from "../movieAPI/fakeMovieService";
import SearchBox from "./common/searchBox";

import {
  getBackendMovies,
  createMovie,
  deleteMovie,
} from "../services/movieService";
import { getBackendGenres } from "../services/genreService";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectGenre: {},
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    // this.play();
    const { data: allGenres } = await getBackendGenres();
    const { data: movies } = await getBackendMovies();

    const genres = [{ _id: "", name: "All Movies" }, ...allGenres];
    // this.setState({ genres, movies: getMovies() });
    this.setState({ genres, movies: movies });
  }

  // methods
  handleDelete = async (movie) => {
    const deletedMovie = await deleteMovie(movie._id);
    const {data:newMovies} = await getBackendMovies();
    this.setState({ movies: newMovies });
    toast.success('movie deleted!')
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies: movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectGenre && selectGenre._id
        ? allMovies.filter((m) => m.genre._id === selectGenre._id)
        : allMovies;

    const filterMoviesColum = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(filterMoviesColum, currentPage, pageSize);

    const count = filteredMovies.length;

    return { data: movies, totalCount: count };
  };

  handleSearch = (data) => {
    this.setState({ movies: data });
  };

  // render
  render() {
    const result = this.getPagedData();
    const { totalCount, data: movies } = result;
    const { currentPage, pageSize, sortColumn } = this.state;
    // if (totalCount === 0) {
    //   return <h1>No Movies...</h1>;
    // }

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectGenre}
          />
        </div>
        <div className="col">
          <div className="row">
            <div className="col-6">
              <Link to="/movies/new">
                <button className="btn btn-primary">Add Movie</button>
              </Link>
            </div>

            <div className="col-6">
              <p>You have {totalCount} Movies.</p>
            </div>

            <form className="col-8 mt-3">
              <SearchBox onSearch={this.handleSearch} data={movies} />
            </form>
          </div>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
