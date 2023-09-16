const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const PORT = process.env.PORT || 3000



app.set('view engine', 'ejs');
app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));

//consume weather api
app.get('/', (req, res) => {
    res.render('weather', {weather: null, error: null});
  })
  
  
  // post request that logs the value of 'city' to the console
  app.post('/', (req, res) => {
    let city = req.body.city;
    const apiKey = '1ac03a97cfac91c16df1f4f4797a1ce9';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`
  
    request(url, function (err, response, body) {
      if(err){
        res.render('weather', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather == undefined){
          res.render('weather', {weather: null, error: 'Error, please try again'});
        } else {
          //console.log(weather);
          res.render('weather', {weather: weather, error: null});
        }
      }
    });
  })
  

  
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
    })