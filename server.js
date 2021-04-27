const PORT = 20001;
const KINDLE_COLS = 63;
const KINDLE_LINES = 28;

const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const WsHixie = require('ws-plus-hixie');



const server = http.createServer((request, response) => {
    const url = request.url;
    console.log("URL: " + url);
    if (url === '/' || url === '/index.html') {
	response.setHeader('Content-Type', 'text/html');
	fs.createReadStream('index.html').pipe(response);
    } else if (url === '/client.js') {
	response.setHeader('Content-Type', 'application/javascript');
	fs.createReadStream('client.js').pipe(response);
    }
});
const wsBridge = new WsHixie(server);

const sendMessage = function(message, cursor) {
    const json = JSON.stringify({ msj : message, cursor : cursor });
    wsBridge.send(json);
}
server.on("error", error => {
    if (error.code === "EADDRINUSE")
	console.log("ERROR: Port already in use");
    else
	console.log(error);
});
server.listen(PORT);

let i = 1;
//setInterval(function(){ sendMessage("hello " + i); i++ }, 3000);


console.log("Listening on port " + PORT);
