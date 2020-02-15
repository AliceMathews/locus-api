const ENV = require("./environment");
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const db = require("./db/index");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const imagesRoutes = require("./routes/images");
const categoriesRoutes = require("./routes/categories");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/images", imagesRoutes(db));
app.use("/api/categories", categoriesRoutes(db));

// Home page
app.get("/", (req, res) => {
  res.send("{hello: world}");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}, in ${ENV}`);
});
