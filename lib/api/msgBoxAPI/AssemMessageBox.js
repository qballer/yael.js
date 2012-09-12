var AssemMessageBox = function (){
	var that = {};
	
	// msg should be a string
	that.logMsg  = function(msg){};

	// msg should be a string
	// will not continue algorithm.
	that.stopOnError = function (errorMsg){};

	// call when you finish making final result.
	// result will be a path-to-file to expose to admin user.
	that.finalResultCB = function (result){};

	//call when finishing init
	that.initCB = function(){};

	return that;

};
module.exports = AssemMessageBox;