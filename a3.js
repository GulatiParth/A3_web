const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("images"));
app.use(express.static("css"));


app.get("/Blog", function(req, res) {
    res.sendFile(path.join(__dirname, "blog.html"));    
});

app.get("/article", function(req, res) {
    res.sendFile(path.join(__dirname, "read_more.html"));    
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
    res.sendFile(path.join(__dirname, "registration.html"));    
});

// For the login form, you are required to check for nulls
// (i.e, check to see if the user entered a value in the 
// respective text fields) and 
//the username does not contain special character.
app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "login.html"));      
});

app.post("/login",function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("username = " + username); 
    console.log("password = " + password);

    res.send("username = " + username);
    try{
        if(username == null || username.length == 0) {
            throw new Error("Please enter a username");
        }
        if(password == null || password.length == 0) {
            throw new Error("Please enter a password");
        }
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(specialChars.test(username) == true){
            throw new Error("User name cannot contain special symbols");
        }
    } catch(e){
        console.log(e);
    }
});



app.post("/dashboard",function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var phone = req.body.phone;

    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    var street = req.body.street;
    var addInfo = req.body.addInfo;
    var zip = req.body.zip;
    var place = req.body.place;
    var country = req.body.country;
    
    console.log(firstName + " " + lastName);
});


app.listen(port);