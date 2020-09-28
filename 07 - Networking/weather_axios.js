const axios = require('axios');
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
    async() => {
        await axios.get(url, {
                method: 'get',
                responseType: 'stream'
            })
            .then((res) => {

                const status = res.status;
                const data = res.data;
                const error = STATUS_CODE[status];


                switch (status) {
                    case 200:
                        processResponse(data, write);
                        break;
                    default:
                        errorResponse(status, error);
                        break;
                }
            }).catch((e) => {
                console.error("Error: ", e.message);

            })
    }
} catch (e) {
    console.error("Error: ", e.message);

}