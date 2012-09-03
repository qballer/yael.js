
var socket = io.connect();
var algorithm = new algorithm();
algorithm.AlgoMessageBox = new AlgoMessageBox();

function start(){
		document.getElementById("statusText").innerHTML="Process Started!";
		document.getElementById("btnStart").innerHTML= '<button type="button" id ="startButton" onclick="start()" disabled="disabled">START</button>'
		socket.emit('getsliceZero', {});
		addLine("YAEL.JS Started");	
	};

function addLine(msg){
		document.getElementById("consoleView").innerHTML+="AlgoMessageBox log: "+msg+"\n";
	};

function getSlice(){
		socket.emit('slice2client',{});
		addLine("getSlice function called");	
	};
// Will be called to run algorithm on slice.
// slice confirmes to the nakedslice interface.
// call resultCB when done.
function processSlice(myNakedSlice){
	algorithm.procceSlice(myNakedSlice);
	addLine("processed slice");
}

// handdle slice Zero and perform init
// call slice zeroCB
function recieveSliceZero(mySlicezero){	
	algorithm.recieveSliceZero(mySlicezero);
	addLine("processed slice zero");
};

socket.on('slice', function(data) {
		//factory method
		var s = new nakedSlice(100);
		s.id=data.id;
		s.buffer=data.buffer;
		console.log(s);
		addLine("slice event recived");	
});

socket.on('server2client', function(data){
	console.log(data);
	if (data !== null){
		addLine(data.data);
		addLine("server2client event recived -- a new connection is established");	
	}
	
});

socket.on('sliceZero', function(data){
	addLine("sliceZero event recived");	
	var mySlicezero = new nakedSlice(100);
	mySlicezero.id = data.id;
	mySlicezero.buffer = data.buffer;
	addLine(mySlicezero.id);
	recieveSliceZero(mySlicezero);
	console.log(mySlicezero);
	addLine("sliceZero logged");	
});

socket.on('nakedSlice', function(data){
	addLine("nakedSlice event recived");
	var myNakedSlice = new nakedSlice(100);
	myNakedSlice.id = data.id;
	myNakedSlice.buffer = data.buffer;
	processSlice(myNakedSlice);
	console.log(myNakedSlice);
	addLine("nakedSlice logged, Slice ID: "+myNakedSlice.id);
});

socket.on('noSliceAvailable', function(data){
	document.getElementById("statusText").innerHTML="Process completed, thank you.";
	addLine("noSliceAvailable event recived");
});

socket.on('logmsg', function(data){
	addLine(data);
});




