const axios = require('axios');
const url = 'http://localhost:2001/getWeather?TORINO,it';
const {
    STATUS_CODE
} = require('./costant');

try {
    // typeof result = STREAM

    axios.get(url)
        .then((res) => {
            const status = res.status;
            const data = res.data;
            const error = STATUS_CODE[status];


            switch (status) {
                case 200:
                    console.log("data: ", data);
                    break;
                default:
                    console.log("default", data);
                    break;
            }
        }).catch((e) => {
            console.error("Error: ", e.message);

        })

} catch (e) {
    console.error("Error: ", e.message);

}