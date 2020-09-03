// console.log(process);
console.log(process.argv);

// Array
let pars = process.argv;
let number, power;
let numIdx = pars.indexOf('--number');
if (numIdx !== -1) {
    number = pars[numIdx + 1];
} else {
    console.log("invalid values");
}

let powerIdx = pars.indexOf('--power');
if (powerIdx !== -1) {
    power = pars[powerIdx + 1];
} else {
    console.log("invalid values");
}

let n = number ** power;

console.log(n)