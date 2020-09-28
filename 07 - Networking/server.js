// WEBSERVER
const http = require('http');

// PARSING della url
const url = require('url');

http.createServer((req, resp) => {
    const { pathname, query } = url.parse(req.url, true)
    console.log("url: ", req.url)
    console.log("pathname: ", pathname)
    console.log("query: ", query)

    resp.end(`You called me with ${req.url}`);
}).listen(2001);

console.log("Listening...")