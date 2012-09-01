var formidable = require("formidable");
var http = require("http");
var url = require("url");
var events = require('events');
var util = require('util');
var validator = require("./validation");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  };

  var server = http.createServer(onRequest);
  server.listen(8000);

  var io = require('socket.io').listen(server);

  console.log("Server has started.");
  
  io.sockets.on('connection', function(socket) {
    socket.emit('server2client', {data: 'test'});
    socket.on('client2server', function(data) {
      console.log(data);
    });
    socket.on('adminConnected', function(){
      console.log('admin connected');
      socket.emit('server2admin', {data: 'adminHello'});
    });
    socket.on('upload', function(){
      console.log('uploading file');
      //toDo: insert validation
      if (validator.validateZippedAlgo() !== false)
        socket.emit('uploadSuccess', {});
      else
        socket.emit('uploadFail', {});
    });
  });

}

exports.start = start;