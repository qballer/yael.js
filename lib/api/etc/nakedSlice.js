
var nakedSlice = function (size){
	var that = {};
	that.ID = null;
	// The size of the naked slice
	// should make this configurable.
	that.size = size;
	// a regular node.js buffer for binary data.
	that.buffer = new ArrayBuffer(size);
	// JSON information for the assmbley.
	// will be saved and being able to load.
	that.jsonAssmeblyObject = null;
	//
	// This is not part of the NakesliceInterface
	// don't count on this value in any way or form;
	//
	that.getID = function (){
		return that.ID;
	};
	//
	// note:  I've added the following to the contex
	// context.algoID = should be uniqe number for each algo;
	// context.runID = represents the number of times the algo run;
	// context.sliceID = the last ID used for a slice at context.runID  for context.algoID
	// the ID identifes a slice in a uniqe way
	that.setID = function (options){
		var sep = ".";
		// e.g 1.1.1;
		options.sliceID += 1;
		console.log("setID: "+options.sliceID);
		that.ID = options.algoID.toString() + sep +
			options.runID.toString() + sep+
			options.sliceID.toString();
		console.log(that.ID);
		
	};

	return that;
};
module.exports = nakedSlice;