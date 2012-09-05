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
	that.stopOnError = function (errorMsg){
		that.logMsg(msg);
		that.pile.Done();
		that.errorHalt(error);
	};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.proccesResultCB = function(isDone){
		if (isDone){
			that.pile.Done();
		} else{
			that.takeResultFromNetwork(function(slice){
				that.pile.add(that.assembler.processResult,slice);
			});
		}
	};

	// call when you finish making final result.
	// result should be a file to expose to admin user.
	that.finalResultCB = function (result){
		that.pile.Done();
		that.grandHalt(result);
	};

	//call when finishing init
	that.initCB = function(){
		finishedLoading = true;
	};
	
	that.doneLoading = function (){
		return finishedLoading;
	};

	that.pile = new pileCreate(that.proccesResultCB);

	return that;

};
module.exports = AssemMessageBox;