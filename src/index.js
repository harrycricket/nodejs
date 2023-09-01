const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const sass = require("node-sass");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
// Http logger
app.use(morgan("combined"));

// Template engine
// Rendering engine setup
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/resources/views"));
console.log(__dirname);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news", { layout: false });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
