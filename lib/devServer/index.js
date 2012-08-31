var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.index;
handle["/admin"] = requestHandlers.admin;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);