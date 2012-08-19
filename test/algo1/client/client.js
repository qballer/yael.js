var algorithm = function (AlgoMessageBox){
	var that = {};
	that.sliceZero = null;
	// Will be called to run algorithm on slice.
	// slice confirmes to the nakedslice interface.
	// call resultCB when done.
	that.procceSlice = function (slice){
		for(var index = 0; i<slice.buffer.length; ++index){
			slice.buffer[index] -= 1;
		}
		that.AlgoMessageBox.resultCB(slice);
	};

	//objects which linkes to system.
	//confirms to the AlgoMessageBox interface.
	that.AlgoMessageBox = AlgoMessageBox;
	
	// handdle slice Zero and perform init
	// call slice zeroCB
	that.recieveSliceZero = function(sliceZero){
		that.sliceZero = sliceZero;
		that.AlgoMessageBox.zeroCB();
	};

	return that;
};

module.exports = algorithm;