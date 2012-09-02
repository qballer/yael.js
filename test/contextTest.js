var context = require("../lib/context/context"),
	util = require('util'),
	path = require ('path'),
	testUtil =  require('./testUtil'),
	broadway = require('broadway'),
	trio = require("../lib/api/trioPlugin");
var app = new broadway.App();

// Passes the second argument to `helloworld.attach`.


var ctxt = new context();
var networkSlices = {};

util.yaelUtil = new testUtil();
console.log("context unit test");
console.log("-----------------");


var trio = util.yaelUtil.loadJSONfile("./algo1/trio.json");

for (var key in trio){
	ctxt[key] = path.resolve( "./algo1/" + trio[key]);
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

//file loader Test
/*var fileLoader = require('../lib/api/etc/tssDasLoader');
fileLoader = new fileLoader();
var divInterface = require('../lib/api/trioAPI/divider.js');
var code = fileLoader.fileLoad(ctxt.pathToDivider, new divInterface());
if (code === null){
	console.log("BAD");
}*/


app.use(new require("../lib/api/trioPlugin"),ctxt) ;
app.init(function(){
	console.log("Init done");
});
//console.log("Session: %j", app);

