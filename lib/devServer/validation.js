var exec = require("child_process").exec;
var server = require("./server");
var jsonLoader = require('../../test/testUtil');
var jsonFile = null;
jsonLoader = new jsonLoader();
var pathToAlgo;

validateZippedAlgo = function(cbFunc){
	var valid = true;
	var algoNumber = server.getAlgoNumber();
	//ToDo: check for error doesn't work - figure out handling of 'folder already exists' error
	exec("mkdir "+ __dirname + "/../../data/algo"+algoNumber+"dir",
		function (error, stdout, stderr) {
			if (error !== null){
				console.log("error in mkdir");
				console.log(error);
	  			valid = false;
	  			//finalValidation();
	  			cbFunc(false);
			}
			else{
				setTimeout(Unzip(),0);
			}
    });

	Unzip = function(){
	 	exec("unzip "+ __dirname + "/../../data/test.zip -d "+ __dirname + "/../../data/algo"+algoNumber+"dir",
			function (error, stdout, stderr) {
				if (error !== null){
					console.log("error in unzip");
					console.log(error);
					valid = false;
					finalValidation();
		}
		else{
			setTimeout(readJson(),3000);
		}
		});
	 };
      	
		
	readJson = function(){
		try{
			//change to check for trio.json
			jsonFile = jsonLoader.loadJSONfile(__dirname + "/../../data/algo"+algoNumber+"dir/test.json", null);
			console.log(jsonFile.pathToAlgo);
		}
		catch(err){
			console.log("Validation failed on json file");
			valid = false;
			finalValidation();
		}
		if (valid === true)
			finalValidation();
	};
		
	finalValidation = function(){
		if (valid !== false && jsonFile !== null && jsonFile !== "undefined"){
			console.log("Validation passed");
			cbFunc(true);
		}
		else{
			console.log("Validation failed");
			console.log(__dirname + "/../../data/algo"+algoNumber+"dir");
			exec("rm -rf "+__dirname + "/../../data/algo"+server.getAlgoNumber()+"dir")
			cbFunc(false);
		}
	}
};

exports.validateZippedAlgo = validateZippedAlgo;