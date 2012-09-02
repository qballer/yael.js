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

server.start(router.route, handle);