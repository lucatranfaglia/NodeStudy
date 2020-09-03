var Promise = require('promise');

console.log("starts");
const array = [1, 2, 3, 4];
let promise_v1 = new Promise((resolve, reject) => {
    let somma = 0
    console.log("res_p: ", typeof resolve, resolve);
    let result = array.forEach(el => {
        console.log(el);

        return somma = somma + el;
    })
    resolve(result);
})
promise_v1.then(results_p_v1 => {
    console.log("results_p_v1: ", typeof results_p_v1, results_p_v1);
})


let promise_v1_1 = new Promise((resolve, reject) => {

    resolve(24);

})
promise_v1_1.then(results_p_v1_1 => {
    console.log("results_p_v1_1: ", typeof results_p_v1_1, results_p_v1_1);
})


let promise = Promise.resolve(async res_p => {
    let somma = 0
    console.log("res_p: ", typeof res_p, res_p);
    return array.forEach(async el => {
        console.log(el);

        return somma = somma + el;
    })

}).then(async results_p => {
    console.log("results_p: ", typeof results_p, results_p);
})

let success = Promise.resolve(async res => {
    let somma = 0
    console.log("resolve: ", typeof res, res);
    return array.forEach(async el => {
        console.log(el);

        return somma = somma + el;
    })
}).then(results_s => {
    console.log("results_s: ", typeof results_s, results_s);
})



console.log("promise_v1:", typeof promise_v1, promise_v1);
console.log("promise:", typeof promise, promise);
console.log("success:", typeof success, success);

console.log("fine");