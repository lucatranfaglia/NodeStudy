var Promise = require('promise');

console.log("starts");

// object
const array = [1, 2, 3, 4];

// object
console.log("array: ", typeof array);

// number
let somma = 0
let promise = new Promise(async(resolve, reject) => {
    console.log("res: ", typeof resolve, resolve);

    // array object
    let result_somma = array.map(n => {
        return somma = somma + n;
    });
    // object


    if (result_somma) {
        resolve(somma);
    } else {
        reject("The was a error.");
    }
})
promise
    .then(async valore_somma => {
        console.log("valore_somma: ", typeof valore_somma, valore_somma);
        let moltiplica = valore_somma * valore_somma;

        console.log("moltiplica: ", typeof moltiplica, moltiplica);
        return moltiplica
    })
    .catch(err => {
        console.log("err:", err);
    });

// Object Promise
console.log("promise:", typeof promise, promise);

console.log("fine");