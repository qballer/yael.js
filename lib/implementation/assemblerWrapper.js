var pileCreat = require("./pile");

var AssemMessageBox = function (assembler){
	var that = {};
	// TODO:give feed dunction to the pile.

	that.pile = new pileCreate();

	// msg should be a string
	that.logMsg  = function(msg){
		console.log(msg);
	};

	// msg should be a string
	that.stopOnError = function (errorMsg){
		that.logMsg(msg);
		that.pile.Done();
	};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.proccesResultCB = function(isDone){
		if (isDone){
			that.pile.Done();
		} else{
			// TODO: read from result array.
			var	slice;
			pile.add(assmebler.processResult(),slice);
		}
	};

	// call when you finish making final result.
	// result should be a file to expose to admin user.
	that.finalResultCB = function (result){};

	//call when finishing init
	that.initCB = function(){};

	return that;

};
module.exports = AssemMessageBox;