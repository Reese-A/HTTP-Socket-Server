let net = require('net');
const URL = require('url').URL
console.log(URL);
let url = new URL(process.argv[2]);
console.log(url);

let ports = {
  'http:':80,
}

const request = net.createConnection({
  host: url.hostname,
  port: url.port || ports[url.protocol],
}, () => {
  request.write(makeReq());
  console.log('Connected');
});

function reqLine(){
  let path = url.pathname;
  return `GET ${path} HTTP/1.1`
}

function makeReq(){
  let date = new Date().toUTCString();
  let host = url.hostname;
  return `${reqLine()}\r\nHost: ${host}\r\nDate: ${date}\r\n\r\n`; 
}

request.on('data', function (data) {
  console.log(data.toString());
});