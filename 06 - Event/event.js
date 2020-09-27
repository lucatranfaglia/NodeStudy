const EventEmitter = require('events');

const evt = new EventEmitter();

let i = 0;

function writeData(data) {
    console.log(i + " writeData: ", data);
    i++;
}

evt.on('onData', data => {
    console.log(i + " ON data: ", data);
    i++;
})


evt.once('onData', data => {
    console.log(i + " ONCE data: ", data);
    i++;
})

evt.emit('onData', [1, 2, 3, 4, 5]);

evt.addListener('onData', writeData);

evt.emit('onData', [3, 5, 7, 8, 12]);