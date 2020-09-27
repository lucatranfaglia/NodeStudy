const fs = require('fs');
const configs = require('./config');

const data = JSON.stringify(configs.config);


const path = "./test.js";
const path2 = "./test2.js";

// Scrittura ASincrona - writeFile(pat, data, option, callback)
fs.writeFile(path, data, { encodign: "ut-8" }, (err) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Create File");
    }
});

console.log("After file creation 1");

// Scrittura ASincrona - writeFile(pat, data, option)
fs.writeFileSync(path2, data, { encodign: "ut-8" });

console.log("After file creation 2");