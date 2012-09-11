var divider = function (){
	var that = {};
	var times = 100;
	var image = null;
	var sliceZero = null;
	var number = 1;
	var MaxInt = /*100000*/160;

	// start preparing a slice.
	// call the sliceCB function.
	that.divide = function (){
		if (number <= (MaxInt-16)){
			var slice  = that.DivMessageBox.createSlice();
			slice.buffer = new ArrayBuffer(64);
			view = new Int32Array(slice.buffer);
			for(var i = 0; i < 16 ; i++){
				console.log("number: " + number);
				view[i]=number;
				console.log("view[i]: " + view[i]);
			    number++;
			}
			that.DivMessageBox.sliceCB(slice);
		}
		else{
			 that.DivMessageBox.doneCB();
		}
	};
	 // function getNewSlice(callback){
  //   var newSlice = new nakedSlice(100);
  //   newSlice.id = sliceID++;
  //   newSlice.buffer = new Uint32Array(16);
  //   for(var i = 0; i < 16 ; i++){
  //   if (number <= MaxInt){
  //         newSlice.buffer[i]=number;
  //           number++;
  //      }
  //      else{
  //         sliceFlag=false;
  //      }
  //    };
  //   console.log("NEW SLICE ID: " +newSlice.id + "\n\n");
  //   callback(newSlice);
  // };
	
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