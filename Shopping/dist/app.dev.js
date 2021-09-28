"use strict";

var express = require("express");

var app = express();

var path = require('path');

var bodyParser = require('body-parser');

var coookieParser = require('cookie-parser');

var JSONdb = require('simple-json-db');

var db = new JSONdb('./userDB.json');

var userRoute = require('./routes/user.route');

var cookieParser = require("cookie-parser");

app.set('view engine', "pug");
app.set('views', "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.use(cookieParser('nhatlyshopping2021'));
app.use('/', userRoute);
var PORT = 3000;
app.listen(PORT, function (req, res) {
  console.log("Port " + PORT + " is running!");
});