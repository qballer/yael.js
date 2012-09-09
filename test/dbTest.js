var nakedSlice = require("../lib/api/etc/nakedSlice");
var dbUtil = require("../lib/db/dbutil");
var jsonLoader = require('./testUtil');
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
testSlice.ID = 666;


var resultString ="";
resultString = dbUtil.sliceToString(testSlice);
console.log("--------result slice string--------");
console.log(resultString);

if (sliceStr === resultString)
	console.log("-----------Test Green-----------");