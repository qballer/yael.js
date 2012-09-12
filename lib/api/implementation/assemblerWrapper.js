//var pileCreate = require("./pile");


var AssemMessageBox = function (assembler){
	var finishedLoading = false;
	var that = {};
	var isDone = false;

	assembler.AssemMessageBox = that;
	that.assembler = assembler;
	
	// msg should be a string
	that.logMsg  = function(msg){
		console.log(msg);
	};

	// msg should be a string
	var noPathToFile = null;
	that.stopOnError = function (errorMsg){
		isDone = true;
		that.logMsg(errorMsg);
		that.giveResultToControl(errorMsg, noPathToFile);
	};


	that.giveResult = function(slice){
	
		if(!isDone){
			console.log('User Assembler gets this slice:' + slice);
			that.assembler.processResult(slice);
		}else{
			console.log('wierd the assembler should be done');
		}
	};

	var noMsg = null;
	// call when you finish making final result.
	// result should be a file to expose to admin user.
	that.finalResultCB = function (PathToResultFile){
		isDone = true;
		console.log("in finalResultCB");
		that.giveResultToControl(noMsg,PathToResultFile);
	};

	//call when finishing init
	that.initCB = function(){
		finishedLoading = true;
	};
	
	that.doneLoading = function (){
		return finishedLoading;
	};

	//that.pile = new pileCreate(function(){
//		console.log('Bug: need more slice.');
	//});

	return that;

};
module.exports = AssemMessageBox;