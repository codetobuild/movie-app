require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
require("./config/db")();

// routes
const movieRoutes = require("./routes/movies");
const genreRoutes = require("./routes/genres");

app.use("/movies", movieRoutes);
app.use("/genres", genreRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("server connected ");
});
 