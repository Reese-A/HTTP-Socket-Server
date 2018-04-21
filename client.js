let net = require('net');
const URL = require('url').URL
console.log(URL);
let url = new URL(process.argv[2]);
console.log(url);


const request = net.createConnection({
  host: url.host,
  port: 80
}, () => {
  request.write(makeReq());
  console.log('Connected');
});

function reqLine(){
  let path = url.pathname;
  let protocol = `${url.protocol.substr(0, 4).toUpperCase()}/1.1`
  return `GET  ${path} ${protocol}`
}

function makeReq(){
  let date = new Date().toUTCString();
  let host = url.host;
  return `${reqLine()}\r\nHost: ${host}\r\nDate: ${date}\r\n\r\n`; 
}

request.on('data', function (data) {
  console.log(data.toString());
});