var algorithm = function (){
	var that = {};
	
	// Will be called to run algorithm on slice.
	// slice confirmes to the nakedslice interface.
	// call resultCB when done.
	that.procceSlice = function (slice){};

	//objects which linkes to system.
	//confirms to the AlgoMessageBox interface.
	that.AlgoMessageBox = AlgoMessageBox;
	
	// handdle slice Zero and perform init
	// call slice zeroCB
	that.recieveSliceZero = function(sliceZero){};

	return that;
};

module.exports = algorithm;