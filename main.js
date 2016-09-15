var express = require("express");
var app = express();

var bodyParser = require('body-parser')
var path = require("path");
var golinks = require("./golinks.js");

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get("/links/:short", function(req, res) {
  var url = golinks.expand(req.params.short);
  if (url) {
    res.redirect(url);
  } else {
    res.send("ERROR!");
  }
});

app.post("/links", function(req, res) {
  var url = req.body.url;
  var short = req.body.short;
  short = short.length !== 0 ? short : undefined;

  short = golinks.add(url, short);
  golinks.save(function() {
    res.send(short);
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
