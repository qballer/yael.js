
var yaelClient = yaelClient||{};

yaelClient.socket = io.connect();
yaelClient.algorithm = new algorithm();
yaelClient.algorithm.AlgoMessageBox = new AlgoMessageBox();
yaelClient.stopflag = false;
yaelClient.resumeflag = false;

yaelClient.genericClient = new function(){
	var that = {};

	that.start = function (){
			document.getElementById("statusText").innerHTML="Process Started!";
			document.getElementById("startButton").innerHTML= '<button type="button" id ="startButton" onclick="yaelClient.genericClient.start()" disabled="disabled">Start</button>';
			document.getElementById("stopButton").innerHTML= '<button type="button" id ="stopButton" onclick="yaelClient.genericClient.stop()">Stop</button>';
			yaelClient.stopflag=false;
			if (yaelClient.resumeflag){
				yaelClient.socket.emit('sliceZeroProcessed', {});
				yaelClient.resumeflag = false;
			}
			else
			{
				yaelClient.socket.emit('getsliceZero', {});
			}			
			yaelClient.genericClient.addLine("YAEL.JS Started");
			yaelClient.algorithm.AlgoMessageBox.logMsg("sent request for slice zero");
	};

	that.stop = function (){
		document.getElementById("stopButton").innerHTML= '<button type="button" id ="stopButton" onclick="yaelClient.genericClient.end()" disabled="disabled">Stop</button>';
		document.getElementById("statusText").innerHTML="Process is being stopped.";
		yaelClient.stopflag=true;
		yaelClient.resumeflag=true;
	};

	that.addLine = function (msg){
			var textarea = document.getElementById("consoleView");
			textarea.innerHTML+="AlgoMessageBox log: "+msg+"\n";
			textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
	};

	that.getSlice = function (){
			yaelClient.socket.emit('slice2client',{});
			yaelClient.genericClient.addLine("gGtSlice function called");
	};
	// Will be called to run algorithm on slice.
	// slice confirmes to the nakedslice interface.
	// call resultCB when done.
	that.processSlice = function (myNakedSlice){
		yaelClient.algorithm.procceSlice(myNakedSlice);
		yaelClient.genericClient.addLine("Processed slice");
	};

	// handdle slice Zero and perform init
	// call slice zeroCB
	that.recieveSliceZero = function (mySlicezero){
		yaelClient.algorithm.recieveSliceZero(mySlicezero);
		yaelClient.genericClient.addLine("Processed slice zero");
	};

	that.strokeDeveloperEgo = function(){
		yaelClient.genericClient.addLine("-----------WELCOME----------");
		yaelClient.genericClient.addLine("Yael.js was created by:");
		yaelClient.genericClient.addLine("Doron Tsur;");
		yaelClient.genericClient.addLine("Yaron Schneider;");
		yaelClient.genericClient.addLine("Amir Shani;");
	};	
	return that;
};

	yaelClient.socket.on('slice', function(data) {
			//factory method
			var s = new nakedSlice(100);
			s.ID=data.ID;
			s.buffer=data.buffer;
			console.log(s);
			yaelClient.genericClient.addLine("Slice event recieved");
	});


	yaelClient.socket.on('server2client', function(data){
		console.log(data);
		if (data !== null){
			yaelClient.genericClient.addLine(data.data);
			yaelClient.genericClient.addLine("Server2client event recieved -- a new connection is established");
			yaelClient.genericClient.strokeDeveloperEgo();
		}		
	});

	yaelClient.socket.on('sliceZero', function(data){
		yaelClient.genericClient.addLine("SliceZero event recieved");
		var mySlicezero = new nakedSlice(100);
		mySlicezero.ID = data.ID;
		mySlicezero.buffer = data.buffer;
		yaelClient.genericClient.addLine(mySlicezero.ID);
		yaelClient.genericClient.recieveSliceZero(mySlicezero);

		yaelClient.genericClient.addLine("sliceZero logged");
	});

	yaelClient.socket.on('nakedSlice', function(object){
		yaelClient.genericClient.addLine("NakedSlice event recieved");
		
		var bufferSize = object.buffer.byteLength;
		//yaelClient.genericClient.addLine("Slice recived, Buffer size: " + bufferSize);
		
		var myNakedSlice = new nakedSlice(bufferSize);
		myNakedSlice.ID = object.ID;		
		myNakedSlice.buffer = object.buffer;
		yaelClient.genericClient.processSlice(myNakedSlice);

		yaelClient.genericClient.addLine("NakedSlice logged, Slice ID: "+ myNakedSlice.ID);
		
	});

	yaelClient.socket.on('noSliceAvailable', function(data){
		document.getElementById("statusText").innerHTML="Process completed, thank you.";
		yaelClient.genericClient.addLine("noSliceAvailable event recieved");
		document.getElementById("stopButton").innerHTML= '<button type="button" id ="stopButton" onclick="yaelClient.genericClient.end()" disabled="disabled">Stop</button>';
	});

