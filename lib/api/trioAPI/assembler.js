var assembler = function (){
	var that = {};
	
	var index = 1
	// Recieve a result to process/aggrigate.
	// Slice confirms to the nakedSlice interface.
	that.processResult = function (slice){
		var view = new Int32Array(slice.buffer);
		for (var i = 0 ; i < 16 ; i++){
			if (view[i]!=0){
				console.log("Prime numer["+index+"]: "+view[i]);
				index++;
				//TODO:
				//write to file
			}
			
	};
	
	// Prepare final result.
	// When done, call finalResultCB from msg box.
	that.finalResult = function(result){};

	// Confirems to the AssemMessageBox interface.
	that.AssemMessageBox = null;
	
	// Startup assembler.
	// When done, call initCB.
	that.init = function (){
		console.log("Assembler initiated");
		that.AssemMessageBox.initCB();
	};

	return that;
};
module.exports = assembler;