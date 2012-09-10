	// context.algoID = should be uniqe number for each algo;
	// context.runID = represents the number of times the algo run;
	// context.sliceID = the last ID used for a slice at context.runID  for context.algoID
var context = function (){
	var that = {};
	//
	// The current alorithm ID
	//
	that.algoID = 0;
	//
	// The current run ID
	//
	that.runID = 0;
	//
	// first available sliceID;
	//
	that.sliceID = 0;

	that.pathToDivider = "";
	that.pathToAssembler = "";
	that.pathToAlgo = "";
	that.pathToFolder= "";

	that.writeToDB = function(cb, slice) {};

	/**
	* No need to populate give result.
	* Part of basic assemblerWrapper implementation.
	*/

	that.giveResult = function(slice){};
	that.grandHalt = function (file){};
	that.errorHalt = function(error){};
	that.takeSliceZero = function(sliceZeroFromDivider){};

	return that;
};
module.exports = context;