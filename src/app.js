const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const port = 7200;



//__dirname gives path of app.js and path join helps in finding path for static public files which has css and js
const PublicStaticPath = path.join(__dirname , '../public')

//it makes express aware that we are accessing static files with this variable
app.use(express.static(PublicStaticPath));

//Partials are like headers , footers which are common in views(template engines)
const viewsPath = path.join(__dirname, '../templates/view');

const partialsPath = path.join(__dirname, '../templates/partials');



//Handlebars being used as template engines
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

const weatherData = require('../utils/Weather');
//TO send something on the server connected URL
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})
//address here is a keyword , req.query refers to the localhost:7200/weather?=city name , the thing after question mark
app.get('/weather' , (req,res) =>{
    const address = req.query.address;

    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

//To render this statement if user gives any other irrelevant url

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})

// Basic server , expresss server is listening on port 7200
app.listen(port, () =>{
    console.log("Server is running on port" , port);
})
