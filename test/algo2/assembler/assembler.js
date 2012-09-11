var fs = require("fs");


var assembler = function (){
	
	var that = {};
	var index = 1;
	var writer = fs.createWriteStream("./result.txt", {
	    flags: "a",
	    encoding: "encoding",
	    mode: 0666
	})
	// recieve a result to process/aggrigate
	// slice confirms to the nakedSlice interface
	that.processResult = function (slice){
			var view = new Int32Array(slice.buffer);
			for (var i = 0 ; i < 16 ; i++){
				if (view[i]!=0){
					//console.log("Prime numer["+index+"]: "+view[i]);
					writer.write("Prime number["+index+"]: "+view[i]);
					index++;
				}
		}		
	};

		
	// prepare finalresult
	// when do call finalResultCB from msg box.
	that.finalResult = function(){
		console.log("Assembler is Done");
		that.AssemMessageBox.finalResultCB("./result.txt");
	};

	// confirems to the AssemMessageBox interface
	that.AssemMessageBox = null;
	
	// startup assembler.
	// call initCB.
	that.init = function (){
		console.log("Assembler is initiated");
		that.AssemMessageBox.initCB();
	};

	return that;
};
module.exports = assembler;