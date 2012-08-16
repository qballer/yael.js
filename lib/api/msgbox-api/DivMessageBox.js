var DivMessageBox = function (){
	var that = {};
	// msg should be a string
	that["logMsg"]  = function (msg){};

	// msg should be a string
	that["stopOnError"] = function (errorMsg){};

	// call when finish dividing a slice.
	// slice should confirm to the the nakedslice interface.
	that["sliceCB"] = function(slice){};

	// call when you have no more slices to divide
	that["doneCB"] = function (){};

	// call when you finish init.
	that["getSliceZeroCB"] = function(){};

};