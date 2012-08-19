var assembler = function (){
	var that = {};
	
	// recieve a result to process/aggrigate
	// slice confirms to the nakedSlice interface
	that.processResult = function (slice){};
	
	// prepare finalresult
	// when do call finalResultCB from msg box.
	that.finalResult = function(){
		
	};

	// confirems to the AssemMessageBox interface
	that.AssemMessageBox = AssemMessageBox;
	
	// startup assembler.
	// call initCB.
	that.init = function (){
		
	};

	return that;
};
module.exports = assembler;