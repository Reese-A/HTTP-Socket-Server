const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {
  request.on('data', (data) => {
    console.log(data.toString());
  })
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, 'localhost', () => {
  console.log('server bound');
});