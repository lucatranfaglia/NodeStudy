const https = require('https');
const fs = require('fs');
const

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
    const req = https.get(url, (res) => {
        const status = res.statusCode;
        const error = STATUS_CODE[status];
        switch (status) {
            case 200:
                processResponse(res);
                break;
            default:
                errorResponse(status, error);
                break;
        }
    });
} catch (e) {
    console.error("Error: ", e.message);

}