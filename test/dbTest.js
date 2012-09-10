
var nakedSlice = require("../lib/api/etc/nakedSlice");
	dbUtil = require("../lib/db/dbutil"),
	jsonLoader = require('./testUtil'),
	trioContext = require('../lib/context/trioContext'),
	path = require('path'),
	db = require('../lib/db/yaeldb');
	

var jsonFile;
var jsonStr;
var jsonLen;

jsonLoader = new jsonLoader();

jsonFile = jsonLoader.loadJSONfile("./algo1/trio.json", null);

if (jsonFile !== null || jsonFile !== 'undefined'){
	jsonStr = JSON.stringify(jsonFile);
	jsonLen = jsonStr.length;
}

console.log("-------------testing-----------------");

var buffStr = "This is a test slice 123";

var sliceStr = jsonLen.toString() + '|' + jsonStr + '|' + buffStr;
console.log("--------------source string ---------------");
console.log(sliceStr);

cObj = dbUtil.stringToJsonNArray(sliceStr);

var testSlice = new nakedSlice(cObj[0].length);
testSlice.buffer = cObj[0];
testSlice.jsonAssmeblyObject = cObj[1];
testSlice.ID = "6.6.6";


var resultString ="";
resultString = dbUtil.sliceToString(testSlice);
console.log("--------result slice string--------");
console.log(resultString);

if (sliceStr === resultString)
	console.log("-----------Test Green-----------");

trioContext = new trioContext();

var pathToAlgo = path.resolve('./algo1');

trioContext.startPlugin(pathToAlgo, 1);

var ninja = function(){
	db.getASlice(function (slice){
		if ((slice !== null) && (slice.ID !== "1.0.100")){
			console.log("ninja slice.id " + slice.ID);
			db.giveResult(slice);
			setTimeout(ninja,0);
		}else{
			console.log("yep I'm done");
		}
	});
};

setTimeout(ninja,0);

process.on('exit', function (code, signal){
	console.log('what?');
	db.flushDB();
});