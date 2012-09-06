var jsonLoader = require('../../test/testUtil');
var jsonFile;
jsonLoader = new jsonLoader();

validateZippedAlgo = function(){
	console.log("validate");
	try{
		jsonFile = jsonLoader.loadJSONfile(__dirname + "/../../data/test.json", null);
	}
	catch(err){
		return false;
	}
	
	if (jsonFile !== null || jsonFile !== "undefined"){
		return true;
	}
};

exports.validateZippedAlgo = validateZippedAlgo;