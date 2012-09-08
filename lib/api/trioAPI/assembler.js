var assembler = function (){
	var that = {};
	
	// Recieve a result to process/aggrigate.
	// Slice confirms to the nakedSlice interface.
	that.processResult = function (slice){};
	
	// Prepare final result.
	// When done, call finalResultCB from msg box.
	that.finalResult = function(result){};

	// Confirems to the AssemMessageBox interface.
	that.AssemMessageBox = null;
	
	// Startup assembler.
	// When done, call initCB.
	that.init = function (){};

	return that;
};
module.exports = assembler;