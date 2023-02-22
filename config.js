
//Creating the weather api url in the format so that city name can be taken from user 
//original link https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=4f3ddbe1a4f8816adc29766ae6589a94
const constants = {
    openWeatherMap: {
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
        SECRET_KEY: "4f3ddbe1a4f8816adc29766ae6589a94"
    }
}


//It means constants can be used by other files also
module.exports = constants;
