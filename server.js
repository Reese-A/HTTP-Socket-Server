const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (client) {
});

server.on('connection', (request) => {
  
  console.log(elements.helium);
})

server.on('error', (err) => {
  throw err;
});

server.listen(8080, 'localhost', () => {
  console.log('server bound');
});