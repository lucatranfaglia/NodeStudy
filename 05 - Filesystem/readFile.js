const fs = require('fs');


const readFileAsyn = (folder, path, encoding) => {
    fs.readdir(folder, encoding, (err, arrFiles) => {
        if (err) {
            console.error(err);
            return;
        }

        let exists = checkFileExists(path)

        for (let f of arrFiles) {
            console.log("F", f)
            if (f === 'config.json') {
                fs.readFile(f, (err, data) => {
                    if (err) {
                        console.error("Error reading file" + err);
                        return;
                    }
                    // converto in oggetto
                    data = JSON.parse(data);
                    console.log("host: ", data.host)
                })
            }
        }

    })
}


const checkFileExists = (path) => {
    fs.stat(path, (err, result) => {
        if (err) {
            console.log("Error", err);
            return false;
        }
        console.log("result", result);
        return result;
    })
}

module.exports = {
    readFileAsyn
};