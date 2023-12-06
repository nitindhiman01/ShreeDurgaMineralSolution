const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require('path');

const app = express();

app.use(express.static('public'));

app.set("views", path.join(__dirname, "../ui/views"));
app.set("view engine", "ejs");

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
})

app.get("/booking", function(req, res){
    res.render("booking");
})

app.listen(3000, function(req, res){
    console.log("Server Started!");
});