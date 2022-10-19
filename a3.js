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
app.post("/registration", function(req, res) {
    
       
    var obj = {
        data:{
            firstname : req.body.firstName,
            lastname : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword,
            phone : req.body.phone,
            street : req.body.street,
            addInfo : req.body.addInfo,
            zip : req.body.zip,
            place : req.body.place,
            country : req.body.country
        },
        errorMsg:{
            firstname : "",
            firstNameChar : "",
            lastName : "",
            lastnameChar : "",
            password : "",
            passwordLength : "",
            phone : "",
            confirmPassword : ""
        }
    };
    // valid input
    if(obj.data.firstname && obj.data.lastname && obj.data.password){
        res.render("dashboard", {layout: false });
    }
    else{  
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(!obj.data.firstname){  // invalid firstname
             obj.errorMsg.firstname ="Please enter a First name";
    
        }
        if(format.test(obj.data.firstname)){      // invalid username with special characters
            obj.errorMsg.firstNameChar = "Firstname cannot contain special characters"
    
        }
        if(!obj.data.lastname){  // invalid lastname
            obj.errorMsg.lastName="Please enter a Last name";
    
        }
        if(format.test(obj.data.lastname)){      // invalid username with special characters
            obj.errorMsg.lastnameChar = "Lastname cannot contain special characters"
    
        } 
        if(!obj.data.password){             // invalid password
            obj.errorMsg.password ="Please enter a Password";
    
        }        
        if(obj.data.password.length < 6 || obj.data.password.length > 12){ // invalid password 
            obj.errorMsg.passwordLength ="Please enter a password between 6 and 12 characters";
    
        }
        if (obj.data.phone.length != 10){
            obj.errorMsg.phone ="Phone number must be at least 10 characters long";
    
        }
        if (obj.data.password != obj.data.confirmPassword){
            obj.errorMsg.confirmPassword ="Password must match with confirmation";
    
        }
        res.render("registration", { sentData : obj, layout: false });
    }  
});


// For the login form, you are required to check for nulls
// (i.e, check to see if the user entered a value in the 
// respective text fields) and 
//the username does not contain special character.
app.get("/login", function(req, res) {    
    res.render("login", {layout: false });       
});

app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
       
    // valid input
    if(username && password){
        res.render("dashboard", {layout: false });
    }
    else{  
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(!username){  // invalid username
            var errorUN="Please enter a username";
            res.render("login", { errorMsg: errorUN, username:username, layout: false });
        }
        else if(format.test(username)){      // invalid username with special characters
            var errorUNsc = "Username cannot contain special characters"
            res.render("login", {errorMsg: errorUNsc, username:username, layout: false });
        } 
        else if(!password){             // invalid password
            var errorpw="Please enter a password";
            res.render("login", { errorMsg: errorpw, password:password , layout: false });
        }        
    }  
});

app.listen(port);