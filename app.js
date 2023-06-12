const express = require("express");

// now to use external server via nide js i.e. making request to external server
// we will use http module
const https = require("https"); 
const app = express();

app.get("/", function(req,res){
    const url ="https://api.openweathermap.org/data/2.5/weather?appid=9e78af4032c2034766e99b52ec92e69a&q=london";
    https.get(url, function(response){
        console.log(response.statusCode);

         // ja response pelam setar ektu portion dekhte chaile
    response.on("data",function(data){
        // console.log(data);
        //   console.log(data); eita amader hexadecimal format e output deye so we will convert this into json format

        const weatherData=JSON.parse(data);
        console.log(weatherData);
        // weatherData amader output debe in a big format like almari ta jokhun mati theke floor r top opdi jaye i.e. taking the entire space
        const temp=weatherData.main.temp;
        console.log(temp);
        const weatherDescription = weatherData.weather[0].description;
        console.log(weatherDescription);
        const icon =weatherData.weather[0].icon;
        const iconUrl =  "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        // res.send("the temperature in london is " + temp + " in kelvin");
        // as ami temp aar weatherdescription dutoi show korte chai user ke  but ami ekbar ei use korte parbo res.send so ami res.write use korbo as res.write multiple times use kora jaye
        res.write("<h1> the temperature in london is  "+ Math.floor(temp-273)+ " in Celsius</h1>");
        res.write("<p> The weather is currently "+weatherDescription+ "</p>");
        res.write("<img src= "+ iconUrl + ">");
        res.send();

        //  now ebar dekhbo aar ekta method dekhbo jetate amra small space e outut pabo
        // const object = {
        //     name : "pb7",
        //     food: "coffee"
        // }
        // console.log(JSON.stringify(object));
        // output --> {"name":"pb7","food":"coffee"}
    })
    })
   


    // res.send("server is running ");
})

app.listen(3000, function(){

    console.log("server is listening on port 3000");

})