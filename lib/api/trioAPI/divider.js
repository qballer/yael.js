var divider = function (){
	var that = {};

	// Start preparing a slice.
	// When done, call the sliceCB function.
	that.divide = function (){};

	// Provide slice zero for system.
	// Call getSliceZeroCB.
	// All init action should be done.
	that.getSliceZero = function(){};

	//Confirms to the DivMessageBox interface.
	that.DivMessageBox = null;
	
	return that;
};
module.exports = divider;