var pileCreate = require("./pile");
var path = require('path');
var slice = require("../etc/nakedSlice");

//
// instance of a class implementing the divider interface
//
var dividerWrapper = function (divider){
	var that  = {};

	divider.DivMessageBox = that;
	that.pile = new pileCreate(divider.divide);
	
	that.divider = divider;

	// msg should be a string
	that.logMsg  = function (msg){
		console.log(msg);
	};

	// msg should be a string
	that.stopOnError = function (errorMsg){
		that.logMsg(errorMsg);
		that.doneCB();
		that.errorHalt(error);
	};

	// call when finish dividing a slice.
	// slice should confirm to the the nakedslice interface.
	that.sliceCB = function(slice){
		console.log("sliceCB:" + slice.size);
		slice.jsonAssmeblyObject = slice.jsonAssmeblyObject || {"empty":"true"};
		console.log("sliceCB: " + slice.ID + " before");
		slice.setID(that.context);
		console.log("sliceCB: " + slice.ID + " after");
		that.writeToDB(slice);
	};

	// call when you have no more slices to divide
	that.doneCB = function (){
		console.log("in doneCB");
		that.pile.Done();
		that.context.alertTheDB();
	};

	that.isDone = function(){
		console.log("dividerWrapper.isDone: "+that.pile.isDone());
		return that.pile.isDone();
	};

	// call when you finish init.
	// sliceZero should be of type naked slice.
	that.getSliceZeroCB = function(sliceZero){
		that.context.takeSliceZero(sliceZero);
	};
	that.createSlice = function (size){
		return new slice(size);
	};
	
	return that;
};
module.exports = dividerWrapper;
