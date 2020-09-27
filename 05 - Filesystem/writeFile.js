const fs = require('fs');

const writeFileAsyn = (path, data, encoding) => {

    // Scrittura ASincrona - writeFile(pat, data, option, callback)
    fs.writeFile(path, data, encoding, (err) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Create File Asych");
        }
    });

    console.log("Write File Asynch");
}

const writeFileSyn = (path, data, encoding) => {
    // Scrittura Sincrona - writeFile(pat, data, option)
    fs.writeFileSync(path, data, encoding);

    console.log("Write File Synch");
}


module.exports = {
    writeFileAsyn,
    writeFileSyn
};