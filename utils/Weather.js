
//For making http calls
const request = require('request');
const constants = require('../config');

//address would be passed by user so using encodeURIComponent which encodes string as valid component of URL
const weatherData = (address,callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    //Body - concept of Object Destruction , its a variable which is resembling the entire content of the openweathermapApi
    //request is used for httpcalls
    //weatherData is being used in main router in app.js , /weather one
    request({url, json:true}, (error, {body})=> {
        console.log(body);
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } 
        else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        }
         else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })

}

module.exports = weatherData; 