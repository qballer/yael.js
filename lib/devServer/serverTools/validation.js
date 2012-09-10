var exec = require("child_process").exec;
var path = require('path');
var server = require("../server");
var jsonLoader = require('../../../test/testUtil');
var fileLoader = require("../../api/etc/tssDasLoader");
var dividerInterface = require("../../api/trioAPI/divider");
var assemblerInterface = require("../../api/trioAPI/assembler");
var algorithmInterface = require("../../api/trioAPI/algorithm");
var jsonFile = null;
var algo = {};

jsonLoader = new jsonLoader();
fileLoader = new fileLoader();

validateZippedAlgo = function(cbFunc){
	var valid = true;
	var algoNumber = server.getAlgoNumber();
	console.log("creating folder: " + algoNumber);
	exec("mkdir "+ __dirname + "/../../../data/algos/algo"+algoNumber,
		function (error, stdout, stderr) {
			if (error !== null){
				console.log("error in mkdir");
				console.log(error);
	  			valid = false;
	  			//finalValidation();
	  			cbFunc({algoFlag: false});
			}
			else{
				setTimeout(Unzip,1000);
			}
    });

	Unzip = function(){
		console.log("unzipping to folder: " + algoNumber);
	 	exec("unzip "+ __dirname + "/../../../data/algos/test.zip -d "+ __dirname + "/../../../data/algos/algo"+algoNumber,
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
			jsonFile = jsonLoader.loadJSONfile(__dirname + "/../../../data/algos/algo"+algoNumber+"/trio.json", null);
			algo.name = jsonFile.name;
			algo.ver = jsonFile.ver;
			algo.desc = jsonFile.descr;
			algo.algoScript = jsonFile.pathToAlgo;
			algo.algoPath = path.normalize(__dirname + "/../../../data/algos/algo"+algoNumber);
			if (valid === true)
				finalValidation();
		}
		catch(err){
			console.log("Validation failed on json file");
			valid = false;
			finalValidation();
		}
		//setTimeout(fileFolderValidation, 0);
	};

	/*fileFolderValidation = function(){
		var userDivider = null,
			userAssembler = null,
			userAlgorithm = null;
		try{
			userDivider = fileLoader.fileLoad(jsonFile.pathToDivider, new dividerInterface());
			userAssembler = fileLoader.fileLoad(jsonFile.pathToAssembler, new assemblerInterface());
			userAlgorithm = fileLoader.fileLoad(jsonFile.pathToAlgo, new algorithmInterface());
		}
		catch(err){
			valid = false;
			finalValidation();
		}
		
		if (userDivider !== null && userAssembler !== null && userAlgorithm !== null){
			finalValidation();
		}
		else{
			valid = false;
			finalValidation();
		}

	};*/
		
	finalValidation = function(){
		if (valid !== false && jsonFile !== null && jsonFile !== "undefined"){
			console.log("Validation passed");
			console.log(algo.name);
			cbFunc({algoFlag: true,
					algo: algo});
		}
		else{
			console.log("Validation failed");
			console.log(__dirname + "/../../../data/algos/algo"+algoNumber);
			exec("rm -rf "+__dirname + "/../../../data/algos/algo"+server.getAlgoNumber());
			cbFunc({algoFlag: false});
		}
	};
};

exports.validateZippedAlgo = validateZippedAlgo;