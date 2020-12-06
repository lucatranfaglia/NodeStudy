
const APPID = '80c446cdfec7e74f9f5fe236b46c1d8a';

const WEATHERURL = 'https://api.openweathermap.org/data/2.5/weather?lang=it&appid='
    + APPID + '&units=metric&q=';
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?lang=it&appid='
    + APPID + '&units=metric';

const STATUS_CODE = require('http').STATUS_CODES;
module.exports = {
    WEATHER_API,
    WEATHERURL,
    STATUS_CODE
};