var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  