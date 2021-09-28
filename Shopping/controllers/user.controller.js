var fs = require('fs');
var shortId = require('shortid');
var md5 = require('md5');
const userDB = "userDB.json";
const productDB = require("../productDB.json");
const homepageController = require('./homepage.controller');
var LocalStorage = require('node-localstorage').LocalStorage;



module.exports.homepage = (req, res) => {
    // console.log(LocalStorage.getItem("cartNumbers"));
    res.render('homepage', {
        products: productDB
    });
}

module.exports.getRegister = (req, res) => {

    res.render('users/register');
}

module.exports.postRegister = (req, res) => {
    req.body.id = shortId.generate();
    req.body.password = md5(req.body.password);
    var data = req.body;
    var notices = [];

    fs.readFile(userDB, 'utf8', (err, usersJSON) => {
        users = JSON.parse(usersJSON);
        users.push(data);
        fs.writeFile(userDB, JSON.stringify(users), 'utf8', function (err) {
            if (err) throw err;
            console.log('complete');
        }
        );
    })
    notices.push("Đăng ký thành công!")
    res.render('users/register', {
        notices: notices
    });
}

module.exports.getLogin = (req, res) => {
    res.render('users/login');
}

module.exports.postLogin = (req, res) => {
    res.redirect('/');
}