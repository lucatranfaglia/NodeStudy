const fetch = require('node-fetch');
const fs = require('fs');


const {
    url,
    STATUS_CODE
} = require('./costant');

const {
    processResponse,
    errorResponse
} = require('./function');


const write = fs.createWriteStream(__dirname + '/weather.json');


try {
    // typeof result = STREAM
    const req = fetch('https://www.nodesource.com/', { method: 'GET' })
        .then((res) => {
            console.log("url", url);
            console.log("res", res.body);
            res.body;
        })
        .then((body) => {
            console.log(body);
        })
        .catch(err => {
            console.error(err);
        });
} catch (e) {
    console.error("Error: ", e.message);

}