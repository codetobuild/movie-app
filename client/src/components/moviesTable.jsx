import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import { Link } from "react-router-dom";

class MoviesTable extends React.Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie)=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => <Like onLike={this.props.onLike} movie={movie} />,
    },
    {
      key: "button",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        movies={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
