import React, { Component } from "react";
// import { getMovies } from "../../movieAPI/fakeMovieService";
import { getBackendMovies } from "../../services/movieService";

class SearchBox extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const {data} = await getBackendMovies();
    this.setState({ data });
  }
  
  raiseSearch = (e) => {
    const { value } = e.currentTarget;
    const movies = this.state.data.filter((item) =>
      item.title.toLowerCase().startsWith(value.toLowerCase())
    );
    this.props.onSearch(movies);
    // console.log(this.props);
    // console.log(movies);
  };

  render() {
      // console.log(this.props, this.state)
    return (
      <form className="col-8 mt-3">
        <input
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
          onChange={this.raiseSearch}></input>
      </form>
    );
  }
}

export default SearchBox;
