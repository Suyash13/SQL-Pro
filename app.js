var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const faker = require('faker');
const http = require('http');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ultimatemysql'
});

app.post("/register", function (req, res) {
    // console.log("Post Request Sent to /Register! " + req.body.email);
    // console.log(req.body);
    var person = {
        email: req.body.email,
        name: req.body.name,
        mobileno: req.body.mobileno,
        pan: req.body.pan,
        id: req.body.id
    };

    connection.query("INSERT INTO users SET ?", person, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect("/");
    });
});

app.post("/update", function (req, res) {
    // console.log("Post Request Sent to /Register! " + req.body.email);
    // console.log(req.body);
    var person1 = {
        email: req.body.email,
        name: req.body.name,
        mobileno: req.body.mobileno,
        pan: req.body.pan,
        id: req.body.id
    };
    // var q = "CALL update_data(" + req.body.email +")";
    connection.query("UPDATE users SET ? WHERE id = " + req.body.id + "", person1, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.redirect("/");
        // res.send("Thank you for joining with us! Your record has been updated");
    });
});

app.get("/", function (req, res) {
    // console.log("SOMEONE REQUESTED US!");
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count;
        res.render("home", { data: count });
        // res.send("We have " + count + " users in our db");
    });
})

app.get("/joke", function (req, res) {
    var joke = "<strong>What do you call a dog that does magic tricks?</strong> <em>A labracadabrador</em>.";
    console.log("REQUESTED THE JOKE ROUTE!")
    res.send(joke);
})

app.get("/random_num", function (req, res) {
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
    console.log("Random number requested");
})

app.listen(3000, function () {
    console.log('Server running on ${port}')
});