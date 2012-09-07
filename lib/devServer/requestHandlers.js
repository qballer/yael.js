var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var indexPage, noAlgoPage, adminPage, adminScript, contextScript, clientScript, nakedSliceScript, client, algoMessageBoxScript;
var exec = require("child_process").exec;
var server = require("./server");

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    indexPage = data;
});
fs.readFile('./indexNoAlgo.html', function (err, data) {
    if (err) {
        throw err;
    }
    noAlgoPage = data;
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
fs.readFile('../context/context.js', function (err, data) {
    if (err) {
        throw err;
    }
    contextScript = data;
});
fs.readFile('../api/etc/nakedSlice.js', function (err, data) {
    if (err) {
        throw err;
    }
    nakedSliceScript = data;
});
fs.readFile('./clientScript.js', function (err, data) {
    if (err) {
        throw err;
    }
    clientScript = data;
});
fs.readFile('../../test/algo1/client/client.js', function (err, data) {
    if (err) {
        throw err;
    }
    client = data;
});
fs.readFile('../api/implementation/AlgoMessageBox.js', function (err, data) {
    if (err) {
        throw err;
    }
    algoMessageBoxScript = data;
});

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();

  form.parse(request, function(error, fields, files) {
    if (files.filename.path !== ""){
      fs.rename(files.filename.path, __dirname + "/../../data/test.zip", function(err) {
        if (error !== null) {
          console.log('error saving file');
          fs.unlink(__dirname + "../../data/test.zip");
          fs.rename(files.filename.path, __dirname + "/../../data/test.zip");
        }
      });
      /*exec("mkdir "+ __dirname + "/../../data/algo"+server.getAlgoNumber()+"dir");
      exec("unzip "+ __dirname + "/../../data/test.zip -d "+ __dirname + "/../../data/algo"+server.getAlgoNumber()+"dir", function (error, stdout, stderr) {
        if (error !== null)
          console.log(error);
        else
          console.log('unzipped');
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write('file loaded');
          response.end();
      });*/
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write('file loaded');
      response.end();
    }
  });
}

function index(response, request) {
  console.log("Request handler 'index' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});
  if (server.getAlgoReadyVal() === false)
    response.write(noAlgoPage);
  else
    response.write(indexPage);
  response.end();
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
function contextScript(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(contextScript);
  response.end();
}
function nakedSliceScript(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(nakedSliceScript);
  response.end();
}
function clientScript(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(clientScript);
  response.end();
}
function client(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(client);
  response.end();
}
function algoMessageBoxScript(response, request) {
  response.writeHead(200, {"Content-Type": "text/javascript"});
  response.write(algoMessageBoxScript);
  response.end();
}

exports.upload = upload;
exports.index = index;
exports.admin = admin;
exports.adminScript = adminScript;
exports.contextScript = contextScript;
exports.nakedSliceScript = nakedSliceScript;
exports.clientScript = clientScript;
exports.client = client;
exports.algoMessageBoxScript = algoMessageBoxScript;