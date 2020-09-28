// EXAMPLE
// const api = "api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}";
// const weather_url = "https://samples.openweathermap.org/data/2.5/weather?q={London,uk}&appid=439d4b804bc8187953eb36d2a8c26a02";

const dotenv = require('dotenv');
const v_amb = dotenv.config();
if (v_amb.error) {
    throw v_amb.error;
}
const { parsed: envs } = v_amb;


// const weather_url = process.env.URL;
// const appid = process.env.APPID;
const appid = envs.APPID;
const weather_url = envs.URL;
const city = process.argv[2] || 'Rome,it';
const language = process.argv[3] || 'it';
const url = weather_url + city + "&appid=" + appid + "&lang=" + language + "&units=metric";
const STATUS_CODE = require('http').STATUS_CODES;


module.exports = {
    envs,
    url,
    STATUS_CODE
}