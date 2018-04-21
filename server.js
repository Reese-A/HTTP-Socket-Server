const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {
  request.on('data', (data) => {
    let strArr = data.toString().split(' ');
    let elementsCheck = elements.hasOwnProperty(strArr[1]);
    if (elementsCheck){
      request.write((elements[strArr[1]]));
    }
  })
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, () => {
  console.log('server bound');
});