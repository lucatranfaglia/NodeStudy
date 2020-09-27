// EXAMPLE
// const api = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}";
// const weather_url = "https://samples.openweathermap.org/data/2.5/weather?q={London,uk}&appid=439d4b804bc8187953eb36d2a8c26a02";
const weather_url = "https://api.openweathermap.org/data/2.5/weather?q=";
const appid = "80c446cdfec7e74f9f5fe236b46c1d8a";
const city = process.argv[2] || 'Rome,it';
const language = process.argv[3] || 'it';
const url = weather_url + city + "&appid=" + appid + "&lang=" + language + "&units=metric";
const STATUS_CODE = require('http').STATUS_CODES;


module.exports = {
    url,
    STATUS_CODE
}