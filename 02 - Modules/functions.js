const { PI } = Math;

const calcCircArea = r => {
    return r ** 2 * PI;
};

const calcRectArea = (a, b) => {
    return a * b;
}

/*
(function(exports, require, module, __filename, __dirname) {
    module.exports = exports = {};

});
*/

// 1. DO NOT DO THIS perdiamo il riferimento - undefined perchè si perde il collegamento (module.exports = exports = {};)
// exports = PI;

// 2. tutto l'oggetto (module.exports = exports = {};) diventa PI (che non è un oggetto)
// module.exports = PI;

// 3. export.nome_della_chiave = valore_della_chiave
// exports.PiGreco = PI;
// exports.PI = PI;

// exports.Calc = {
//     PI,
//     calcRectArea,
//     calcCircArea
// };


// ----------------------------------------------------------
// -> NOTA BENE
// se viene usato "module.exports =" tutti gli exports inseriti successivamente non verranno esportati
// se viene usato "exports =" tutti gli exports inseriti successivamente non verranno esportati

// exports è un riferimento a module.exports


module.exports = {
    PI,
    calcRectArea,
    calcCircArea
};