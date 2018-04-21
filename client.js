let net = require('net');

const request = net.createConnection({
  host: process.argv[2],
  port: 80
}, () => {
  request.write(makeReq());
  console.log('Connected');
});

function makeReq(){
  let url = process.argv[2]
  return `GET / HTTP/1.1\r\n\r\n`
}

process.stdin.on('data', function (data) {
});

request.on('data', function (data) {
  console.log(data.toString());
  request.end()
});