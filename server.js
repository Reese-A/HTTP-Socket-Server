const net = require('net');
const elements = require('./elements');

const server = net.createServer(function (request) {

  request.on('data', (data) => {

    let strArr = data.toString().split(' ');
    console.log(strArr);
    
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
      let type = '';
      if (uri === '/css/styles.css') {
        type = 'Content-Type: text/css; charset=utf-8';
      } else {
        type = 'Content-Type: text/html; charset=utf-8';
      }
      return `${statusLine()}\n${setDate()}\n${type}`;
    }

    if (uri === '/') {
      let contentLength = elements['/index.html'].length;
      console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/index.html']}\n`);
      request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/index.html']}\n`);
    } else {
      if (elementsCheck) {
        let contentLength = elements[uri].length;
        console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements[uri]}\n`);
        request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements[uri]}\n`);
      } else {
        let contentLength = elements['/notFound'].length;
        console.log(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/notFound']}\n`);
        request.write(`${makeHeader()}\nContent-Length: ${contentLength}\n\n${elements['/notFound']}\n`);
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