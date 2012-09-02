var socket = io.connect('http://localhost');

socket.on('slice', function(data) {
		//factory method
		var s = new nakedSlice(100);
		s.id=data.id;
		s.buffer=data.buffer;
		console.log(s);
});

function start(){
		document.getElementById("statusText").innerHTML="Process Started!";
		document.getElementById("btnStart").innerHTML= '<button type="button" id ="startButton" onclick="start()" disabled="disabled">START</button>'
	};

function addLine(){
		document.getElementById("consoleView").innerHTML+="newline\n";
	};

function getSlice(){
		socket.emit('slice2client',{});
	};

