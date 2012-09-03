
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
		addLine("slice2client event emmited");	
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
		addLine("server2client event recived");	
	}
	
});

socket.on('sliceZero', function(data){
	var mySlicezero = new nakedSlice(100);
	mySlicezero.id = data.id;
	mySlicezero.buffer = data.buffer;
	addLine("sliceZero event recived");	
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
	addLine("nakedSlice event recived");
});




