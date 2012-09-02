var jsonLoader = require('../../test/testUtil');
var jsonFile;
jsonLoader = new jsonLoader();

validateZippedAlgo = function(){
	console.log('valid');
	try{
		jsonFile = jsonLoader.loadJSONfile("/home/user/tmp/test.json", null);
	}
	catch(err){
		return false;
	}
	
	if (jsonFile !== null || jsonFile !== "undefined")
		return true;
};

exports.validateZippedAlgo = validateZippedAlgo;