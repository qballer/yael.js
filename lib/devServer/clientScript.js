var algorithm = new algorithm();

var socket = io.connect();

var AlgoMessageBox = function (){
	var that = {};

	// msg should be a string
	that.logMsg = function (msg){
		addline(msg);
	};

	// Call when you are done aggrigating a single result.
	// should be null if not done;
	that.resultCB = function(slice){
		socket.emit('resultSlice', slice);
	};

	//call when finishing recieveSliceZero
	that.zeroCB = function(){
		socket.emit('sliceZeroProcessed', {});
	};

	return that;
};

function start(){
		document.getElementById("statusText").innerHTML="Process Started!";
		document.getElementById("btnStart").innerHTML= '<button type="button" id ="startButton" onclick="start()" disabled="disabled">START</button>'
	};

function addLine(msg){
		document.getElementById("consoleView").innerHTML+="AlgoMessageBox log: "+msg+"\n";
	};

function getSlice(){
		socket.emit('slice2client',{});
	};
// Will be called to run algorithm on slice.
// slice confirmes to the nakedslice interface.
// call resultCB when done.
function processSlice(myNakedSlice){
	algorithm.procceSlice(myNakedSlice);
}

//objects which linkes to system.
//confirms to the AlgoMessageBox interface.
	algorithm.AlgoMessageBox = new AlgoMessageBox();
	
// handdle slice Zero and perform init
// call slice zeroCB
function recieveSliceZero(mySlicezero){	
	algorithm.recieveSliceZero(mySlicezero);
};

socket.on('slice', function(data) {
		//factory method
		var s = new nakedSlice(100);
		s.id=data.id;
		s.buffer=data.buffer;
		console.log(s);
});

socket.on('server2client', function(data){
	console.log(data);
	if (data !== null){
		addLine(data.data);
		addLine("server2client event recived");	
	}
	socket.emit('getsliceZero', {});
});

socket.on('sliceZero', function(data){
	var mySlicezero = new nakedSlice(100);
	mySlicezero.id = data.id;
	mySlicezero.buffer = data.buffer;
	addLine(mySlicezero.id);
	recieveSliceZero(mySlicezero);
	console.log(mySlicezero);
});

socket.on('nakedSlice', function(data){
	var myNakedSlice = new nakedSlice(100);
	myNakedSlice.id = data.id;
	myNakedSlice.buffer = data.buffer;
	processSlice(myNakedSlice);
	console.log(myNakedSlice);
});




