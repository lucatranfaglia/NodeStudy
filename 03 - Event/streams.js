const fs = require('fs');

const zlib = require('zlib');
const gzip = zlib.createGzip();
// export function createReadStream(path: PathLike, options ? : string | {
//     flags ? : string;
//     encoding ? : BufferEncoding;
//     fd ? : number;
//     mode ? : number;
//     autoClose ? : boolean;
//     /**
//      * @default false
//      */
//     emitClose ? : boolean;
//     start ? : number;
//     end ? : number;
//     highWaterMark ? : number;
// }): ReadStream;

// export function createWriteStream(path: PathLike, options ? : string | {
//     flags ? : string;
//     encoding ? : BufferEncoding;
//     fd ? : number;
//     mode ? : number;
//     autoClose ? : boolean;
//     emitClose ? : boolean;
//     start ? : number;
//     highWaterMark ? : number;
// }): WriteStream;

// SORGENTE DI DATI (file,) - readable stream
const read = fs.createReadStream(__dirname + '/data.txt');

const write = fs.createWriteStream(__dirname + '/copy_data.txt');

const write2 = fs.createWriteStream(__dirname + '/copy_data2.txt');

const write3 = fs.createWriteStream(__dirname + '/copy_data2.gz');

// readable => viene eseguita quando la Stream è leggibile
read.on('readable', () => {
    console.log('stream ready: ', read.read());
})

// 1. alternativa read.on('data')

// contenuto del Buffer
read.on('data', (data) => {
    //visualizzo il buffer
    console.log('data: ', data);
    //visualizzo il contenuto del file
    console.log('data2: ', data.toString());

    // copia il testo presente di data.txt e lo scrive sul file copy_data.txt (se non è presente lo crea)
    write.write(data);
})


// 2. alternativa read.pipe(data)

// reindirizza tutta la sorgente di read (nell'esempio data.txt) in write (precisamente in copy_data.txt), tramite pipe
read.pipe(write2)

read.pipe(gzip).pipe(write3);


// GESTIONE DELL'ERRORE
// In mancanza del file gestisce l'errore
read.on('error', (err) => {
    console.log('error: ', err.toString());
})

// In mancanza del file gestisce l'errore
write.on('error', (err) => {
    console.log('error: ', err.toString());
})