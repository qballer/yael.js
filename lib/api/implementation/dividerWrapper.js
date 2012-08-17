var pileCreate = require("./pile");

//
// instance of a class implementing the divider interface
//
var dividerWrapper = function (divider){
	var that  = {};
	that.pile = new pileCreate(divider.divide());
	that.divider = divider;

	// msg should be a string
	that.logMsg  = function (msg){
		console.log(msg);
	};

	// msg should be a string
	that.stopOnError = function (errorMsg){
		that.logMsg(errorMsg);
		that.pile.Done();
	};

	// call when finish dividing a slice.
	// slice should confirm to the the nakedslice interface.
	that.sliceCB = function(slice){
		var dataSlice = slice ;// TODO: create dataslice
		that.pile.add(function(toConsume){
			//todo write to DB
			//call back to add to array of slices or dump
			//TODO: connect to diffrent pile
		},dataSlice);
	};

	// call when you have no more slices to divide
	that.doneCB = function (){
		that.pile.Done();
	};

	// call when you finish init.
	// sliceZero should be of type naked slice.
	that.getSliceZeroCB = function(sliceZero){
		that.sliceZero = sliceZero;
	};

	

	return that;

	
};
