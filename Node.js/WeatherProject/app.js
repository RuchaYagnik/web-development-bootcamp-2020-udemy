//jshint esversion:6

const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req, res){

    const query = req.body.cityName;
    const appid = "357a2edd664a24bb5e7eb74483eecee5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    
    http.get(url, function(response){
        
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";

            res.write("<h1>The weather in " + query +  " is "  + temp + " degrees celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDescription + ".</p>");
            res.write("<img src=" + imageurl + ">");
            
            res.send();
        
        });
    });

})



app.listen(3000, function(){
    
    console.log("Server is running on port 3000.");
});

