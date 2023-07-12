global.mysql = require('./mysql/mysqlCon.js');
var express = require("express");
var busboy = require('connect-busboy'); //middleware for form/file upload
var bodyParser = require("body-parser");
var app = express();
var https = require('https');
global.fs = require('fs');
global.ffmpeg = require('ffmpeg')

//var allowCrossDomain = function(req,res, next) {
//    res.header('Access-Control-Allow-Origin', '1.1.1.2');
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    res.header('Access-Control-Allow-Header', 'Content-Type');
//
//    next();
//};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(allowCrossDomain);
app.use(function(req, res, next) {
    res.setHeader('charset', 'utf-8');
    next();
});
app.use(busboy());

var options = {
  //key: fs.readFileSync('/root/key.pem'),
  //cert: fs.readFileSync('/root/key-cert.pem')
};

var routes = require("./routes/routes.js")(app);
app.use(express.static(__dirname + '/public'));

var server = app.listen(80, function () {
    console.log("API listening on port %s...", server.address().port);
});

https.createServer(options, app).listen(443, function(){
  console.log("Express server listening on port 443");
});
