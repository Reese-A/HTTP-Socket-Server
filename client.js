let net = require('net');
const URL = require('url').URL
let url = new URL(`http://${process.argv[2]}`);
let ports = {
  'http:': 80,
}

const request = net.createConnection({
  host: url.hostname,
  port: url.port || ports[url.protocol],
}, () => {
  request.write(makeReq());
  console.log('Connected');
});

function reqLine() {
  let path = url.pathname;
  return `GET ${path} HTTP/1.1`
}

function makeReq() {
  let date = new Date().toUTCString();
  let host = url.hostname;
  return `${reqLine()}\r\nHost: ${host}\r\nDate: ${date}\r\n\r\n`;
}

let response = ''

request.on('data', function (data) {
  // console.log(data.toString())
  response += data;
  request.end();
});

request.on('end', () => {
  let splitData = response.toString().split('\r\n\r\n');
  let head = splitData[0];
  let splitHead = head.split(': ');
  let body = splitData[1];
  if (splitHead.includes('chunked')) {
    let tmp = body.split('\r\n');
    let odds = tmp.filter(function (value, idx) {
      if (idx % 2 !== 0) {
        return true;
      }
      return false;
    })
    let joined = odds.join('');
    console.log(joined);
  }
  console.log(body);
});