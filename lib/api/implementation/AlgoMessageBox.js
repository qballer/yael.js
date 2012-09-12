var AlgoMessageBox = function (){
	var that = {};

	// msg should be a string
	that.logMsg = function (msg){
		yaelClient.genericClient.addLine(msg);
	};

	// Call when you are done aggrigating a single result.
	// should be giveToNetworknull if not done;
	that.resultCB = function(slice){
		// for(var i = 0 ; i < 16 ; i++){
		// 	yaelClient.genericClient.addLine("slice.buffer[i]="+slice.buffer[i]);
		// }
		setTimeout(function(slice){
			if (yaelClient.stopflag){
				yaelClient.socket.emit('resultSliceStop', slice);
				document.getElementById("statusText").innerHTML="Process Stopped.";
				document.getElementById("startButton").innerHTML= '<button type="button" id ="startButton" onclick="yaelClient.genericClient.start()">Resume</button>';
			}
			else {
				yaelClient.socket.emit('resultSlice', slice);
			}
		},0,slice);
	};

	//call when finishing recieveSliceZero
	that.zeroCB = function(){
		yaelClient.socket.emit('sliceZeroProcessed', {});
	};

	return that;
};
module.exports = AlgoMessageBox;