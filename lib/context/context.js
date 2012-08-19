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

	that.writeToDB = function(cb, slice) {};
	that.giveToNetwork = function(slice) {};
	that.takeResultFromNetwork = function (cb,slice){};
	that.grandHalt = function (cb,slice){};

	return that;
};
module.exports = context;