var AlgoMessageBox = function (){
	var that = {};

	// msg should be a string
	that.logMsg = function (msg){
		addline(msg);
	};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.resultCB = function(slice){
		socket.emit('resultSlice', slice);
	};

	//call when finishing recieveSliceZero
	that.zeroCB = function(){
		socket.emit('sliceZeroProcessed', {});
	};

	return that;
};
module.exports = AlgoMessageBox;