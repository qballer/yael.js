var exec = require("child_process").exec;
var server = require("./server");
var jsonLoader = require('../../test/testUtil');
var jsonFile = null;
jsonLoader = new jsonLoader();
var algo = {};

validateZippedAlgo = function(cbFunc){
	var valid = true;
	var algoNumber = server.getAlgoNumber();
	//ToDo: check for error doesn't work - figure out handling of 'folder already exists' error
	exec("mkdir "+ __dirname + "/../../data/algos/algo"+algoNumber,
		function (error, stdout, stderr) {
			if (error !== null){
				console.log("error in mkdir");
				console.log(error);
	  			valid = false;
	  			//finalValidation();
	  			cbFunc({algoFlag: false});
			}
			else{
				setTimeout(Unzip,0);
			}
    });

	Unzip = function(){
	 	exec("unzip "+ __dirname + "/../../data/algos/test.zip -d "+ __dirname + "/../../data/algos/algo"+algoNumber,
			function (error, stdout, stderr) {
				if (error !== null){
					console.log("error in unzip");
					console.log(error);
					valid = false;
					finalValidation();
				}
				else{
					setTimeout(readJson, 0);
			}
		});
	 };
      			
	readJson = function(){
		try{
			//change to check for trio.json
			jsonFile = jsonLoader.loadJSONfile(__dirname + "/../../data/algos/algo"+algoNumber+"/test.json", null);
			console.log(jsonFile.version);
			algo.name = jsonFile.name;
			algo.ver = jsonFile.version;
			algo.desc = jsonFile.description;
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
			console.log(algo.name);
			cbFunc({algoFlag: true,
					algo: algo});
		}
		else{
			console.log("Validation failed");
			console.log(__dirname + "/../../data/algos/algo"+algoNumber);
			exec("rm -rf "+__dirname + "/../../data/algos/algo"+server.getAlgoNumber());
			cbFunc({algoFlag: false});
		}
	}
};

exports.validateZippedAlgo = validateZippedAlgo;