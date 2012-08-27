var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var indexPage, adminPage;

var events = require('events');
var util = require('util');


Eventer = function(){
  events.EventEmitter.call(this);
  this.tryEvent = function(data){
    this.emit('test',data);
  }
};
util.inherits(Eventer, events.EventEmitter);

Listener = function(){
  this.testHandler = function(data){
    console.log(data);
  }
};

var eventer = new Eventer();
var listener = new Listener(eventer);
eventer.on('test', listener.testHandler);

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    indexPage = data;
  });
fs.readFile('./admin.html', function (err, data) {
    if (err) {
        throw err;
    }
    adminPage = data;
  });

function start(response, request) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
  	'<title>Yael.js Admin Console</title>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<p>'+
		'<h1>Yael.js Admin Console</h1>'+
	'</p>'+
    '<form name="loadFilesForm" action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="filename" multiple="multiple">'+
    '<input type="submit" value="Upload file" title="Click to load selected file"/>'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    console.log("about to test emitter")
    this.emit('test','emitTest on start in request handlers');
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();

  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.rename(files.filename.path, "/home/user/temp_node.js/tmp/test.zip", function(err) {
      if (err) {
        fs.unlink("/home/user/temp_node.js/tmp/test.zip");
        fs.rename(files.filename.path, "/home/user/temp_node.js/tmp/test.zip");
      }
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("zip file uploaded");
    response.end();
  });
}

function index(response, request) {
  console.log("Request handler 'index' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(indexPage);
  response.end();
  console.log("about to test emitter")
  eventer.tryEvent("index event test");
}

function admin(response, request) {
  console.log("Request handler 'admin' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(adminPage);
  response.end();
  console.log("about to test emitter")
    this.emit('test','emitTest on admin in request handlers');
}

function show(response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}


exports.start = start;
exports.upload = upload;
exports.index = index;
exports.show = show;
exports.admin = admin;