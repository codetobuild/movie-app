import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (  <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5 ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            MOVIE-APP
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/movies" className="nav-link">
                  Movies
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/customers" className="nav-link">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/rentals" className="nav-link">
                  Rentals
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav> );
}

export default Navbar;
