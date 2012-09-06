var AlgoMessageBox = function (){
	var that = {};

	// msg should be a string
	that.logMsg = function (msg){
		yaelClient.genericClient.addline(msg);
	};

	// Call when you are done aggrigating a single result.
	// should be giveToNetworknull if not done;
	that.resultCB = function(slice){
		/*TODO
		check stop event
		*/
		yaelClient.socket.emit('resultSlice', slice);
	};

	//call when finishing recieveSliceZero
	that.zeroCB = function(){
		yaelClient.socket.emit('sliceZeroProcessed', {});
	};

	return that;
};
module.exports = AlgoMessageBox;