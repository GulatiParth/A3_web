const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const handlebars = require("express-handlebars");

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("images"));
app.use(express.static("css"));


app.get("/Blog", function(req, res) {
    res.render("blog", {layout: false });
});

app.get('/', function(req, res) {
    res.render("blog", {layout: false });
});

app.get("/article", function(req, res) {
    res.render("read_more", {layout: false });    
});



/*
For the registration form, you have to check for nulls 
AND implement at least 3 complex validation criteria 
using regular expressions on all the fields 
(For example, enforcing that the user must enter a password
that is 6 to 12 characters and the password must have 
letters and numbers only but the phone number mush be 
only numbers)
*/
app.get("/registration", function(req, res) {
    res.render("registration", {layout: false });
});

// For the login form, you are required to check for nulls
// (i.e, check to see if the user entered a value in the 
// respective text fields) and 
//the username does not contain special character.
app.get("/login", function(req, res) {
    res.render("login", {layout: false });      
});

// app.post("/login", function(req, res) {
    
// });

app.listen(port);