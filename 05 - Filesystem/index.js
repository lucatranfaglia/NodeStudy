const configs = require('./config');
const write = require('./writeFile');
const read = require('./readFile');

const data = JSON.stringify(configs.config);
const encoding = "utf8";

const path = "./config.json";
const path2 = "./config2.json";



write.writeFileAsyn(path, data, encoding);
write.writeFileSyn(path2, data, encoding);

// 
read.readFileAsyn('.', path, encoding);