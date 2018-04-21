const net = require('net');

const server = net.createServer(function (client) {
});

server.on('connection', (request) => {
  
  console.log('connected');
})

server.on('error', (err) => {
  throw err;
});

server.listen(8080, 'localhost', () => {
  console.log('server bound');
});