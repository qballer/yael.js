var divider = function (){
	var that = {};
	var times = 100;
	var image = null;
	var sliceZero = null;
	// start preparing a slice.
	// call the sliceCB function.
	that.divide = function (){
		var slice  = that.DivMessageBox.createSlice();
		var buffer = new Uint16Array(slice.buffer);
		for (var index = 0; index<buffer.length; ++index){
				buffer[index] = index;
		}
		that.DivMessageBox.sliceCB(slice);
		--times;
		if (times === 0){
			that.DivMessageBox.doneCB();
		}
	};
	
	//provide slice zero for system.
	//call getSliceZeroCB.
	// all init action should be done.
	that.getSliceZero = function(){
		console.log("Get Silice O");
		if (sliceZero === null){
			sliceZero = that.DivMessageBox.createSlice();
		}
		that.DivMessageBox.getSliceZeroCB(sliceZero);
	};

	that.test = function (){
		console.log("Test OK!");
	};

	//confirms to the DivMessageBox interface.
	that.DivMessageBox = null;
	
	return that;
};
module.exports = divider;