const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {

  request.on('data', (data) => {

    let strArr = data.toString().split(' ');
    let uri = strArr[1]
    let elementsCheck = elements.hasOwnProperty(uri);

    function setDate() {
      let timeStamp = new Date().toUTCString();
      return `Date: ${timeStamp}`;
    }

    function statusLine() {
      let splitArr = strArr[2].split('\r');
      let status = '';
      if (uri !== '/' && elementsCheck === false) {
        status = '404 Not Found';
      } else {
        status = '200 ok';
      }
      return `${splitArr[0]} ${status}`;
    }

    function makeHeader() {
      let type = 'Content-Type: text/html; text/css; charset=utf-8';
      return `${statusLine()}\n${setDate()}\n${type}`;
    }

    if (uri === '/') {
      let contentLength = elements['/index'].length;
      console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/index']}`);
      request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/index']}`);
    } else {
      if (elementsCheck) {
        let contentLength = elements[uri].length;
        console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements[uri]}`);
        request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements[uri]}`);
      } else {
        let contentLength = elements['/notFound'].length;
        console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/notFound']}`);
        request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/notFound']}`);
      }
    }
  })
});

server.on('error', (err) => {
  throw err;
});

server.listen(8080, () => {
  console.log('server bound');
});