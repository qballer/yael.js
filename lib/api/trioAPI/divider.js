var divider = function (){
	var that = {};

	// Start preparing a slice.
	// Call the sliceCB function.
	that.divide = function (){};

	// Provide slice zero for system.
	// Call getSliceZeroCB.
	// All init action should be done.
	that.getSliceZero = function(){};

	//confirms to the DivMessageBox interface.
	that.DivMessageBox = null;
	
	return that;
};
module.exports = divider;