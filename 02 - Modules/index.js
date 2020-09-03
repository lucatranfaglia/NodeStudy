// const config = require('config');
// Cerca il file "config":
// 1. sulla cartella del progetto (require('./config'))
// 2. sulla cartella node_modules 
// 3. $HOME/node_modules
// 4. $HOME/node_libraries
// 5. $NODE_PATH = D:/MODULES;


const config = require('./config');

const OPS = require('./functions');

// native module node
const fs = require('fs');

const api = require('./api.json');

console.log(OPS);
console.log(OPS.calcCircArea(2, 4));
console.log(OPS.calcRectArea(2, 4));
console.log(api);