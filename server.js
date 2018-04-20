const net = require('net');

const server = net.createServer(function (client) {
  clientArr.push(client);
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, '0.0.0.0', () => {
  console.log('server bound');
});