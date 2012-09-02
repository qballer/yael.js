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
		var dataSlice = slice;
		that.pile.add(function(toConsume){
			that.writeToDB(function (){
				that.giveToNetwork(toConsume);
			},toConsume);
		},slice);
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
	that.createSlice = function (){
		return new slice(100);
	};
	
	return that;
};
module.exports = dividerWrapper;
