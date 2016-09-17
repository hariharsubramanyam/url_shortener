var express = require("express");
var bodyParser = require('body-parser')
var path = require("path");
var linkmap = require("./linkmap.js");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

// Expand shortened URL.
app.get("/links/:short", function(req, res) {
  var url = linkmap.expand(req.params.short);
  if (url) {
    res.redirect(url);
  } else {
    res.send("ERROR!");
  }
});

// Shorten URL.
app.post("/links", function(req, res) {
  var short = req.body.short.replace(/\s+/g, '');
  short = short.length !== 0 ? short : undefined;
  short = linkmap.add(req.body.url, short);
  linkmap.save(function() {
    res.send(short);
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
