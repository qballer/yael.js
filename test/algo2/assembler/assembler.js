var fs = require("fs");


var assembler = function (){
	
	var that = {};
	var index = 1;
	var writer = fs.createWriteStream("result.txt", {
	    flags: "a",
	    encoding: "encoding",
	    mode: 0666
	})
	// recieve a result to process/aggrigate
	// slice confirms to the nakedSlice interface
	that.processResult = function (slice){
			var view = new Int32Array(slice.buffer);
			var bitView = new Uint8Array(slice.buffer);
			
			console.log("IN PROCESS RESULT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")	
			console.log("slice.buffer length: " + slice.buffer.byteLength);
			for (var j = 0 ; j < 16 ; j++){
				console.log("regular buffer: "+slice.buffer[i]);	
				console.log("bitView: "+bitView[i]);
			};

			
			for (var i = 0 ; i < 16 ; i++){
				if (view[i]!=0){
					//console.log("Prime numer["+index+"]: "+view[i]);
					writer.write("Prime number["+index+"]: "+view[i]);
					console.log("Prime number["+index+"]: "+view[i]);
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