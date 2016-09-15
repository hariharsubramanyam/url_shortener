var express = require("express");
var bodyParser = require('body-parser')
var path = require("path");
var golinks = require("./golinks.js");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// Create mapping page.
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// Expand shortened URL.
app.get("/links/:short", function(req, res) {
  var url = golinks.expand(req.params.short);
  if (url) {
    res.redirect(url);
  } else {
    res.send("ERROR!");
  }
});

// Shorten URL.
app.post("/links", function(req, res) {
  var short = req.body.short;
  short = short.length !== 0 ? short : undefined;
  short = golinks.add(req.body.url, short);
  golinks.save(function() {
    res.send(short);
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});