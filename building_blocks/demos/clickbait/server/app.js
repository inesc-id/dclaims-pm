var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(8092, function () {
    console.log("Listening on port %s...", server.address().port);
});


