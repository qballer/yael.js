var AlgoMessageBox = function (){
	var that = {};

	// msg should be a string
	that.logMsg = function (msg){};

	// Call when you are done aggrigating a single result.
	// should be giveToNetworknull if not done;
	that.resultCB = function(slice){};

	//call when finishing recieveSliceZero
	that.zeroCB = function(){};

	return that;
};
module.exports = AlgoMessageBox;