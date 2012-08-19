var divider = function (){
	var that = {};
	var times = 100;
	var image = null;
	var sliceZero = null;
	// start preparing a slice.
	// call the sliceCB function.
	that.divide = function (){
		var slice  = that.DivMessageBox.createSlice();
		if (times >0){
			for (var index = 0;index<buffer.length; ++index){
				slice.buffer[index] = 1;
			}
			sliceCB(slice);
			--times;
		} else{
			that.DivMessageBox.doneCB();
		}
	};

	//provide slice zero for system.
	//call getSliceZeroCB.
	// all init action should be done.
	that.getSliceZero = function(){
		if (sliceZero === null){
			sliceZero = that.DivMessageBox.createSlice();
		}
		that.DivMessageBox.getSliceZeroCB(sliceZero);
	};

	//confirms to the DivMessageBox interface.
	that.DivMessageBox = null;
	
	return that;
};
module.exports = divider;