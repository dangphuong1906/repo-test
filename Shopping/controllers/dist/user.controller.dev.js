"use strict";

var fs = require('fs');

var shortId = require('shortid');

var md5 = require('md5');

var userDB = "userDB.json";

var productDB = require("../productDB.json");

var homepageController = require('./homepage.controller');

var LocalStorage = require('node-localstorage').LocalStorage;

module.exports.homepage = function (req, res) {
  console.log(LocalStorage.getItem("cartNumbers"));
  res.render('homepage', {
    products: productDB
  });
};

module.exports.getRegister = function (req, res) {
  res.render('users/register');
};

module.exports.postRegister = function (req, res) {
  req.body.id = shortId.generate();
  req.body.password = md5(req.body.password);
  var data = req.body;
  var notices = [];
  fs.readFile(userDB, 'utf8', function (err, usersJSON) {
    users = JSON.parse(usersJSON);
    users.push(data);
    fs.writeFile(userDB, JSON.stringify(users), 'utf8', function (err) {
      if (err) throw err;
      console.log('complete');
    });
  });
  notices.push("Đăng ký thành công!");
  res.render('users/register', {
    notices: notices
  });
};

module.exports.getLogin = function (req, res) {
  res.render('users/login');
};

module.exports.postLogin = function (req, res) {
  res.redirect('/');
};