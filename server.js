const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {

  request.on('data', (data) => {
    function setDate() {
      let timeStamp = new Date().toUTCString();
      return `Date: ${timeStamp}`;
    }

    let strArr = data.toString().split(' ');

    function statusLine() {
      let splitArr = strArr[2].split('\r');
      let status = '';
      if (elementsCheck === false) {
        status = '404 Not Found';
      } else {
        status = '200 ok';
      }
      return `${splitArr[0]} ${status}`;
    }

    function makeHeader(){
      let type = 'Content-Type: text/html; text/css';
    }

    let uri = strArr[1]
    if (uri === '/') {
      let contentLength = elements['/index'].length;
      request.write(elements['/index']);
    }

    let elementsCheck = elements.hasOwnProperty(uri);

    if (elementsCheck) {
      let contentLength = elements[uri].length;
      request.write(elements[uri]);
    } else {
      let contentLength = elements['/notFound'].length;
      request.write(elements["/notFound"]);
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