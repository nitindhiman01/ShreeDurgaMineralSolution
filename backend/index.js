const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static('public'));

app.set("views", path.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(session({
    secret: "Our Little Secret",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/mineralWaterDB", {useNewUrlParser : true});
// mongoose.set("userCreateIndex", true);

const userSchema = new mongoose.Schema({
    username : String,
    password : String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/", function(req, res){
    res.render("index");
});

app.get("/products", function(req, res){
    res.render("product");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/booking", function(req, res){
    res.render("booking");
});


app.post("/register", function(res, req){
    
    User.register({username:req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local") (req, res, function(){
                res.redirect("/confirm");
            });
        }
    });
});



app.listen(3000, function(req, res){
    console.log("Server Started!");
});