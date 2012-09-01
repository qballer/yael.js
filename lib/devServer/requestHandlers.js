var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var indexPage, adminPage, adminScript;
var events = require('events');
var util = require('util');
var exec = require("child_process").exec;

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
fs.readFile('./adminScript.js', function (err, data) {
    if (err) {
        throw err;
    }
    adminScript = data;
});

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();

  form.parse(request, function(error, fields, files) {
    fs.rename(files.filename.path, "/home/user/tmp/test.zip", function(err) {
      if (error !== null) {
        console.log('error saving file');
        fs.unlink("/home/user/tmp/test.zip");
        fs.rename(files.filename.path, "/home/user/tmp/test.zip");
      }
    });
    exec("unzip /home/user/tmp/test.zip -d /home/user/tmp/", function (error, stdout, stderr) {
      if (error !== null)
        console.log(error);
      else
        console.log('unzipped');
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('file loaded');
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
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(adminPage);
  response.end();
}

function adminScript(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(adminScript);
  response.end();
}

function sendFile(response, request) {
  console.log("Request handler 'sendFile' was called.");
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

exports.upload = upload;
exports.index = index;
exports.admin = admin;
exports.adminScript = adminScript;