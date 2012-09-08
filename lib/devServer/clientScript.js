
var yaelClient = yaelClient||{};

yaelClient.socket = io.connect();
yaelClient.algorithm = new algorithm();
yaelClient.algorithm.AlgoMessageBox = new AlgoMessageBox();
yaelClient.stopflag = false;


yaelClient.genericClient = new function(){
	var that = {};

	that.start = function (){
			document.getElementById("statusText").innerHTML="Process Started!";
			document.getElementById("startButton").innerHTML= '<button type="button" id ="startB" onclick="yaelClient.genericClient.start()" disabled="disabled">START</button>';
			document.getElementById("stopButton").innerHTML= '<button type="button" id ="stopB" onclick="yaelClient.genericClient.stop()">STOP</button>';
			yaelClient.stopflag=false;
			yaelClient.socket.emit('getsliceZero', {});
			yaelClient.genericClient.addLine("YAEL.JS Started");
			yaelClient.algorithm.AlgoMessageBox.logMsg("msg test");
	};

	that.stop = function (){
		document.getElementById("stopButton").innerHTML= '<button type="button" id ="stopB" onclick="yaelClient.genericClient.end()" disabled="disabled">STOP</button>';
		document.getElementById("statusText").innerHTML="Process is being stopped.";
		yaelClient.stopflag=true;
	};

	that.addLine = function (msg){
			var textarea = document.getElementById("consoleView");
			textarea.innerHTML+="AlgoMessageBox log: "+msg+"\n";
			textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
	};

	that.getSlice = function (){
			yaelClient.socket.emit('slice2client',{});
			yaelClient.genericClient.addLine("getSlice function called");
	};
	// Will be called to run algorithm on slice.
	// slice confirmes to the nakedslice interface.
	// call resultCB when done.
	that.processSlice = function (myNakedSlice){
		yaelClient.algorithm.procceSlice(myNakedSlice);
		yaelClient.genericClient.addLine("processed slice");
	};

	// handdle slice Zero and perform init
	// call slice zeroCB
	that.recieveSliceZero = function (mySlicezero){
		yaelClient.algorithm.recieveSliceZero(mySlicezero);
		yaelClient.genericClient.addLine("processed slice zero");
	};

	
	return that;
};

	yaelClient.socket.on('slice', function(data) {
			//factory method
			var s = new nakedSlice(100);
			s.id=data.id;
			s.buffer=data.buffer;
			console.log(s);
			yaelClient.genericClient.addLine("slice event recived");
	});


	yaelClient.socket.on('server2client', function(data){
		console.log(data);
		if (data !== null){
			yaelClient.genericClient.addLine(data.data);
			yaelClient.genericClient.addLine("server2client event recived -- a new connection is established");
		}
		
	});

	yaelClient.socket.on('sliceZero', function(data){
		yaelClient.genericClient.addLine("sliceZero event recived");
		var mySlicezero = new nakedSlice(100);
		mySlicezero.id = data.id;
		mySlicezero.buffer = data.buffer;
		yaelClient.genericClient.addLine(mySlicezero.id);
		yaelClient.genericClient.recieveSliceZero(mySlicezero);
		console.log(mySlicezero);
		yaelClient.genericClient.addLine("sliceZero logged");
	});

	yaelClient.socket.on('nakedSlice', function(data){
		yaelClient.genericClient.addLine("nakedSlice event recived");
		// if (yaelClient.stopflag){
			
		// }
		// else {
			var myNakedSlice = new nakedSlice(100);
			myNakedSlice.id = data.id;
			myNakedSlice.buffer = data.buffer;
			yaelClient.genericClient.processSlice(myNakedSlice);
			console.log(myNakedSlice);
			yaelClient.genericClient.addLine("nakedSlice logged, Slice ID: "+myNakedSlice.id);
		//}
	});

	yaelClient.socket.on('noSliceAvailable', function(data){
		document.getElementById("statusText").innerHTML="Process completed, thank you.";
		yaelClient.genericClient.addLine("noSliceAvailable event recived");
	});

