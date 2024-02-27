const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require('node:path');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

//database import
const connectDatabase = require("./config/database");

const app = express();


app.use(express.static('public'));
app.use(express.json());

//route imports
const product = require("./routes/productRoute");

app.use("", product); 

//config
dotenv.config({path: "backend/config/config.env"});

app.set("views", path.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended:true
}));

//middleware for errors
app.use(errorMiddleware);

//connecting to the database
connectDatabase();

app.get("/", function(req, res){
    res.render("index");
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

app.get("/account",function(req, res){
    res.render("confirm");
    
});


app.listen(3000, function(req, res){
    console.log(`Server Started on port 3000`);
});