"use strict";

var fs = require('fs');

var md5 = require('md5');

var usersJSON = require('../userDB.json');

var users = usersJSON; // var getDB = () => {
//     var users;
//     fs.readFile('input.json', "utf8", (err, usersJSON) => {
//         var x = JSON.parse(usersJSON);
//         (!x) ? users = [] : users = x;
//     })
//     return users;
// }

module.exports.authRegister = function (req, res, next) {
  var username = req.body.username;
  var notices = []; // var users = getDB();
  // var users = [];
  // fs.readFile('input.json', 'utf8', (err, dataJSON) => {
  //     (!dataJSON) ? data = [] : data = JSON.parse(dataJSON);   
  //     users = data;
  // })

  var findedUser = users.find(function (user) {
    return user.username == username;
  });

  if (findedUser) {
    notices.push("Username đã tồn tại, vui lòng nhập username khác!");
    res.render('users/register', {
      notices: notices,
      values: req.body
    });
    return;
  }

  next();
};

module.exports.authLogin = function (req, res, next) {
  var obj_inputLogin = req.body;
  var notices = [];
  var findedUser = users.find(function (user) {
    return user.username == obj_inputLogin.username;
  });

  if (!findedUser) {
    notices.push("Username này chưa được đăng ký!");
    res.render('users/login', {
      notices: notices,
      values: req.body
    });
    return;
  }

  if (md5(obj_inputLogin.password) != findedUser.password) {
    notices.push("Tài khoản hoặc mật khẩu không hợp lệ!");
    res.render('users/login', {
      notices: notices,
      values: req.body
    });
    return;
  }

  res.cookie("userId", findedUser.id, {
    signed: true
  });
  next();
};

module.exports.authCookie = function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/login');
    return;
  }

  var obj_findedUser = users.find(function (user) {
    return user.id == req.signedCookies.userId;
  });

  if (!obj_findedUser) {
    res.redirect('/login');
    return;
  }

  next();
};