global.mysql = require('./mysql/mysqlCon.js');
var express = require("express");
var bodyParser = require("body-parser");
var http = require('http');
var https = require('https');
var passport = require('passport')
var fs = require('fs');
var app = express();

var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/karaoke.veranstaltungsurl.de/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/karaoke.veranstaltungsurl.de/cert.pem')
};

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
app.use(require('express-session')({ secret: '4spiafdG4RUphSyT0tMDLHj0WFk', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var routes = require("./routes/routes.js")(app);
app.use(express.static(__dirname + '/public'));
app.use('/flags/*', express.static(__dirname + '/public/flags/undefined.svg'));

// ======================= HTTTP Server =======================

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://karaoke.veranstaltungsurl.de" + req.url });
res.end();
}).listen(80);
  console.log("Karaoke System",
            `API listening on port 80 forwarding to 443...`);

// ======================= HTTTP Server =======================


// ======================= HTTTPS Server ======================

https
  .createServer(
    {
      key: fs.readFileSync("/etc/letsencrypt/live/karaoke.veranstaltungsurl.de/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/karaoke.veranstaltungsurl.de/cert.pem"),
    },
    app
  )
  .listen(443, () => {
  console.log("Karaoke System",
            `API listening on port 443...`);
  });

// ======================= HTTTPS Server ======================
