var sliceManager = function (){
	var that = {};

	var sliceID = 0;
	var resultArray = [];
	var sliceArray = [];
	var missingResultsArray[];

	that.getNewSlice = function(){
		var slice = new nakedSlice(100);
		/*
		TO DO:
		get new slice from divider
		
		slice.id = newslice.id;
		slice,buffer = newslice.buffer;

		sliceID = slice.id;
		sliceArray[sliceID] = sliceID;
		*/

		return slice;
	};

	that.storeResultSlice = function(slice){
		var resultSlice = new nakedSlice(100);
		resultSlice.id = slice.id;
		resultSlice.buffer = sllice.buffer;

		resultArray[resultSlice.id]=resultSlice.id;
		/*
		TO DO:
		move slice to assembler/database
		*/
	};

	that.sliceAvailable = function(){
		/*
		TO DO:
		check divider for available slices
		*/
		return true;
	};

	that.findMissingResults = function(){
		for (int i = 0; i < sliceArray.length(); i++){
			if (sliceArray[i]!==resultArray[i]){
				missingResultsArray[i]=sliceArray[i];
			}
		}
		return missingResultsArray;
	};

	that.getCurrentSliceID = function(){
		return sliceID;
	};

	that.setCurrentSliceID = function(int){
		sliceID = int;
	};

	that.getResultArray = function(){
		return resultArray;
	};

	that.getSliceArray = function(){
		return sliceArray;
	};

	return that;
};
module.exports = sliceManager;