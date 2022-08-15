var express = require('express');
var app = express();

app.get("/", function (req, res) {
    console.log("SOMEONE REQUESTED US!");
    // console.log(req);
    res.send("You've reached the home page!")
})

app.get("/random_num", function (req, res) {
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
    console.log("Random number requested");
})

app.listen(4000, function () {
    console.log("Server running on 3000!")
});