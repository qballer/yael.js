var divider = function (DivMessageBox){
	var that = {};
	// start preparing a slice.
	// call the sliceCB function.
	that["divide"] = function (){};

	//provide slice zero for system.
	//call getSliceZeroCB.
	// all init action should be done.
	that["getSliceZero"] = function(){};

	//confirms to the DivMessageBox interface.
	that["DivMessageBox"] = DivMessageBox;
	
	return that;
};
module.exports = divider;