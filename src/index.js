const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const sass = require("node-sass");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
// http logger
app.use(morgan("combined"));

// template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/resources/views"));
console.log(__dirname);
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news", { layout: false });
});

// sass.render(
//   {
//     file: path.join(__dirname, "/resources/scss"),
//     data: "body{background:blue; a{color:black;}}",
//     importer: function (url, prev, done) {
//       // url is the path in import as is, which LibSass encountered.
//       // prev is the previously resolved path.
//       // done is an optional callback, either consume it or return value synchronously.
//       // this.options contains this options hash, this.callback contains the node-style callback
//       someAsyncFunction(url, prev, function (result) {
//         done({
//           file: result.path, // only one of them is required, see section Special Behaviours.
//           contents: result.data,
//         });
//       });
//       // OR
//       var result = someSyncFunction(url, prev);
//       return { file: result.path, contents: result.data };
//     },
//   },
//   function (error, result) {
//     // node-style callback from v3.0.0 onwards
//     if (!error) {
//       // No errors during the compilation, write this result on the disk
//       fs.writeFile(yourPathTotheFile, result.css, function (err) {
//         if (!err) {
//           //file written on disk
//         }
//       });
//     }
//   }
// );

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
