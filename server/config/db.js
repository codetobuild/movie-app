const mongoose = require("mongoose");

// DATABASE_URL = "mongodb://localhost:27017/vidly-back";

function connectDatabase() {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("database-connected");
  });
}

module.exports = connectDatabase;
