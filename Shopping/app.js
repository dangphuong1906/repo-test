const express = require("express");
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
const coookieParser = require('cookie-parser');


const JSONdb = require('simple-json-db');
const db = new JSONdb('./userDB.json');




const userRoute = require('./routes/user.route');
const cookieParser = require("cookie-parser");

app.set('view engine', "pug");
app.set('views', "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser('nhatlyshopping2021'));

app.use('/', userRoute);

const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log("Port " + PORT + " is running!");
})