var context = require("../lib/context/context"),
	util = require('util'),
	path = require ('path'),
	testUtil =  require('./testUtil');

var ctxt = new context();

var networkSlices = {};

util.yaelUtil = new testUtil();
console.log("context unit test");
console.log("-----------------");


var trio = util.yaelUtil.loadJSONfile("./algo1/trio.json");

for (var key in trio){
	ctxt[key] = path.resolve( "./algo1/" + trio[key]);
	console.log(ctxt[key]);
}

ctxt.writeToDB = function (cb, slice){
	console.log(slice);
	cb(slice);
};
ctxt.giveToNetwork = function (slice){
	networkSlices.push(slice);
};
ctxt.takeResultFromNetwork = function(cb, slice){
	cb(networkSlices.shift());
};
ctxt.grandHalt = function (file){
	console.log(file);
};
ctxt.errorHalt = ctxt.grandHalt;
