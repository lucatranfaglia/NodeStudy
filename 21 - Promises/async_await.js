const fetch = require('node-fetch');

const albumUrl = 'https://jsonplaceholder.typicode.com/albums';

const photoUrl = 'https://jsonplaceholder.typicode.com/photos';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';


// Vogliamo tutti gli album
function fetchAlbums() {
    const albums = awa
}
console.log("Start");

async function fetchAlbum(id) {
    let album;
    album = await fetch(albumUrl + '/' + id)
        .then(resp => {

            console.log("resp: ", resp.status);

            console.log("resp: ", resp.headers);
            resp.json();
        })
        .then(albumContent => {
            console.log("resp: ", albumContent);
            return album = albumContent;
        })
        .catch(err => {
            console.log("Error:",
                err);
        })
    console.log("album: ", album);
    return album;
}

let res = fetchAlbum(1);
console.log("res: ", res);
console.log("End");