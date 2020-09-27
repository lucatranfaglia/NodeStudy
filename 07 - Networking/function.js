function processResponse(res, write) {
    // salva il risultato tramite pipe su write (weather.json)
    res.pipe(write);
    // visualizza la callback in console
    res.pipe(process.stdout);

    let response = "";
    // chunk è un pezzo dello stream
    // TRASMISSIONE PARZIALE
    res.on('data', chunk => {
        console.log("Stream chunk: ", chunk);
        response += chunk;
    });
    // TRASMISSIONE COMPLETATA
    res.on('end', () => {
        try {
            // converto il file da stringa ad oggetto (per poterci lavorare)
            const weatherObj = JSON.parse(response);
            console.log("weatherObj:", weatherObj);
            console.log("weather:", weatherObj.weather[0].description);
        } catch (e) {
            console.error(e);
        }
    })
}

function errorResponse(status, error) {
    console.error("Errore. Status: ", status, " - ", error);
}

exports.processResponse = processResponse;
exports.errorResponse = errorResponse;