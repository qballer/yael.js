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

  var nakedSlice = function (size){
    var that = {};
    var ID = null;
    // The size of the naked slice
    // should make this configurable.
    that.size = size;
    // a regular node.js buffer for binary data.
    that.buffer = new ArrayBuffer(size);
    // JSON information for the assmbley.
    // will be saved and being able to load.
    that.jsonAssmeblyObject = {};
    //
    // This is not part of the NakesliceInterface
    // don't count on this value in any way or form;
    //
    that.getID = function (){
      return ID;
    };
    //
    // note:  I've added the following to the contex
    // context.algoID = should be uniqe number for each algo;
    // context.runID = represents the number of times the algo run;
    // context.sliceID = the last ID used for a slice at context.runID  for context.algoID
    // the ID identifes a slice in a uniqe way
 //   that.setID = function (option){
  //    var sep = ".";
      // e.g 1.1.1;
 //     ID = string.concat (options.algoID.toString(),sep,
  //      options.runID.toString(),sep,
   //     options.sliceID.toString());
  //    options.sliceID += 1;
   // };

    return that;
  };

  var server = http.createServer(onRequest);
  server.listen(8000);

  var io = require('socket.io').listen(server);
  
  var testSlice = new nakedSlice(100);

  for(var i = 0; i < 100 ; i++){
    testSlice.buffer[i]=i;
  }

  console.log("Server has started.");
  
  io.sockets.on('connection', function(socket) {
    socket.emit('server2client', {data: 'test'});
    socket.on('client2server', function(data) {
      console.log(data);
    });
    socket.on('slice2client', function(){
      console.log("sending slice to client");
      socket.emit('slice',testSlice);
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