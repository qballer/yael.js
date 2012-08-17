var nakedSlice = function (){
	var that = {};
	// The size of the naked slice
	// should make this configurable.
	that.size = 100;
	// a regular node.js buffer for binary data.
	that.buffer = new buffer(size);
	// JSON information for the assmbley.
	// will be saved and being able to load.
	that.jsonAssmeblyObject = {};
	return that;
};
module.exports = nakedSlice;