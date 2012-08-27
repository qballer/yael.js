
var formidable = require("formidable");
var http = require("http");
var url = require("url");
var events = require('events');
var util = require('util');


function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  };

 
  var server = http.createServer(onRequest).listen(8000);
  console.log("Server has started.");


	server.on('connection',function(stream){
		console.log('someone connected');	
	});

	server.on('test',function(data){
		console.log(data);
	})
}

exports.start = start;