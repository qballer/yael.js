
var nakedSlice = function (size){
	var that = {};
	var ID = null;
	// The size of the naked slice
	// should make this configurable.
	that.size = size;
	// a regular node.js buffer for binary data.
	that.buffer = new ArrayBuffer(size);
	// JSON information for the assmbley.
	// will be saved and being able to load.
	that.jsonAssmeblyObject = {};
	//
	// This is not part of the NakesliceInterface
	// don't count on this value in any way or form;
	//
	that.getID = function (){
		return ID;
	};
	//
	// note:  I've added the following to the contex
	// context.algoID = should be uniqe number for each algo;
	// context.runID = represents the number of times the algo run;
	// context.sliceID = the last ID used for a slice at context.runID  for context.algoID
	// the ID identifes a slice in a uniqe way
	that.setID = function (option){
		var sep = ".";
		// e.g 1.1.1;
		ID = string.concat (options.algoID.toString(),sep,
			options.runID.toString(),sep,
			options.sliceID.toString());
		options.sliceID += 1;
	};

	return that;
};
module.exports = nakedSlice;