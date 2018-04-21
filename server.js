const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {
  request.on('data', (data) => {
    let strArr = data.toString().split(' ');
    console.log(strArr);
    let uri = strArr[1]
    if(uri === '/'){
      request.write(elements['/index']);
    }
    let elementsCheck = elements.hasOwnProperty(uri);
    if (elementsCheck){
      request.write((elements[uri]));
    }
    console.log(data.toString());
  })
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, () => {
  console.log('server bound');
});