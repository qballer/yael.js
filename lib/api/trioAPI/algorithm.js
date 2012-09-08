var algorithm = function (){
	var that = {};
	
	// Will be called to run algorithm on slice.
	// Slice confirmes to the nakedslice interface.
	// Call resultCB when done.
	that.procceSlice = function (slice){};

	//Objects which linkes to system.
	//Confirms to the AlgoMessageBox interface.
	that.AlgoMessageBox = AlgoMessageBox;
	
	// Handle slice zero and perform init.
	// Call slice zeroCB.
	that.recieveSliceZero = function(sliceZero){};

	return that;
};


