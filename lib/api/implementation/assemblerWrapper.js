var pileCreate = require("./pile");


var AssemMessageBox = function (assembler){
	var finishedLoading = false;
	var that = {};

	assembler.AssemMessageBox = that;
	that.assembler = assembler;
	
	// msg should be a string
	that.logMsg  = function(msg){
		console.log(msg);
	};

	// msg should be a string
	var noPathToFile = null;
	that.stopOnError = function (errorMsg){
		that.logMsg(errorMsg);
		that.pile.Done();
		that.giveResultToControl(errorMsg, noPathToFile);
	};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.proccesResultCB = function(isDone){
		if (isDone){
			that.pile.Done();
		} else{
			
		}
	};

	that.giveResult = function(slice){
		that.pile.add(that.assembler.processResult,slice);
		that.pile.run();
	};

	var noMsg = null;
	// call when you finish making final result.
	// result should be a file to expose to admin user.
	that.finalResultCB = function (PathToResultFile){
		that.pile.Done();
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

	that.pile = new pileCreate(function(){
		console.log('Bug: need more slice.');
	});

	return that;

};
module.exports = AssemMessageBox;