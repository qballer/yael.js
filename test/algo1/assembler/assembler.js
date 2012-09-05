var assembler = function (){
	var that = {};
	var num = 0;
	
	// recieve a result to process/aggrigate
	// slice confirms to the nakedSlice interface
	that.processResult = function (slice){
		console.log("Assembler" + slice);
		console.log("Assembler number" + num);
		++num;
		if (num >=  100){
			setTimeout(0, that.finalResult);
		}else{
			that.AssemMessageBox.proccesResultCB();
		}
	};
		
	// prepare finalresult
	// when do call finalResultCB from msg box.
	that.finalResult = function(){
		console.log("Assem Done");
		that.AssemMessageBox.finalResultCB();
	};

	// confirems to the AssemMessageBox interface
	that.AssemMessageBox = null;
	
	// startup assembler.
	// call initCB.
	that.init = function (){
		console.log("Assem init");
	};

	return that;
};
module.exports = assembler;