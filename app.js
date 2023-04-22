const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")    
    });

app.post("/", function(req, res) {
    console.log(req.body.cityName)
    const query = req.body.cityName;
    const apiKey = "26941d567631437905a3d4bf8ab13244";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            const description = weatherdata.weather[0].description;
            const temperature = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(description);
            console.log(temperature);
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>The Temperature in " + req.body.cityName +" is " + temperature + " degrees Celcius.</h1>");
            res.write("<p>It is " + description + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
            })

        })
    });

    

app.listen(3000, function() {
    console.log("Server is running")
})
