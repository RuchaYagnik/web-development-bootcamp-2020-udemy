//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var n1 = Number(req.body.num1);
    var n2 = Number(req.body.num2);

    var result = n1 + n2;

    res.send("Result of calculation: " + result);
});

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
    var wt = parseFloat(req.body.weight);
    var ht = parseFloat(req.body.height);

    var bmi = wt / (ht*ht);

    res.send("Your BMI is " + bmi);
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});

