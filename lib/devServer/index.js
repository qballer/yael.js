var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var routes = {}

routes["/"] = requestHandlers.index;
routes["/admin"] = requestHandlers.admin;
routes["/adminScript.js"] = requestHandlers.adminScript;
routes["/upload"] = requestHandlers.upload;
routes["/contextScript.js"] = requestHandlers.contextScript;
routes["/nakedSliceScript.js"] = requestHandlers.nakedSliceScript;
routes["/clientScript.js"] = requestHandlers.clientScript;
routes["/client.js"] = requestHandlers.client;
routes["/algoMessageBoxScript.js"] = requestHandlers.algoMessageBoxScript;
routes["/yael-logo.png"] = requestHandlers.logo;

server.start(router.route, routes);
//module.exports.server = server;