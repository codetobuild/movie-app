import React from "react";
import Movies from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Navbar from "./components/common/navbar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <main className="container">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/movies" />
        <Redirect from="/" to="/not-found" />
      </Switch>
    </main>
  );
};

export default App;
