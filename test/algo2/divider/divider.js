var divider = function (){
	var that = {};
	var times = 100;
	var image = null;
	var sliceZero = null;
	var number = 1;
	var MaxInt = 10000;

	// start preparing a slice.
	// call the sliceCB function.
	that.divide = function (){
		if (number <= (MaxInt-16)){
			var slice  = that.DivMessageBox.createSlice();
			slice.buffer = new ArrayBuffer(64);
			view = new Int32Array(slice.buffer);
			for(var i = 0; i < 16 ; i++){
				view[i]=number;
			    number++;
			}
			slice.buffer = view;
			console.log("IN DIVIDER MAX INT IS: " +MaxInt);
			console.log("IN DIVIDER NUMBER IS: " +number);
			that.DivMessageBox.sliceCB(slice);
		}
		else{
			console.log("Calling doneCB");
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