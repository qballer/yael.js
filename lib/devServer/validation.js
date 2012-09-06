var jsonLoader = require('../../test/testUtil');
var jsonFile;
jsonLoader = new jsonLoader();

validateZippedAlgo = function(){
	console.log("validate");
	try{
		console.log(__dirname + "/../../data/test.zip");
		jsonFile = jsonLoader.loadJSONfile(__dirname + "/../../data/test.zip", null);
		console.log("1");
	}
	catch(err){
		return false;
	}
	
	if (jsonFile !== null || jsonFile !== "undefined"){
		console.log("2");
		return true;
	}
};

exports.validateZippedAlgo = validateZippedAlgo;