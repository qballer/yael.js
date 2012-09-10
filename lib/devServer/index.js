var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

handle["/"] = requestHandlers.index;
handle["/admin"] = requestHandlers.admin;
handle["/adminScript.js"] = requestHandlers.adminScript;
handle["/upload"] = requestHandlers.upload;
handle["/contextScript.js"] = requestHandlers.contextScript;
handle["/nakedSliceScript.js"] = requestHandlers.nakedSliceScript;
handle["/clientScript.js"] = requestHandlers.clientScript;
handle["/client.js"] = requestHandlers.client;
handle["/algoMessageBoxScript.js"] = requestHandlers.algoMessageBoxScript;
handle["/yael-logo.png"] = requestHandlers.logo;

server.start(router.route, handle);
//module.exports.server = server;