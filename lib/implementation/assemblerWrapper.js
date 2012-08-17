var AssemMessageBox = function (){
	var that = {};
	
	// msg should be a string
	that.logMsg  = function(msg){};

	// msg should be a string
	that.stopOnError = function (errorMsg){};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.proccesResultCB = function(isDone){};

	// call when you finish making final result.
	// result should be a file to expose to admin user.
	that.finalResultCB = function (result){};

	//call when finishing init
	that.initCB = function(){};

	return that;

};
module.exports = AssemMessageBox;