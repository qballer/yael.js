var socket = io.connect();

socket.on('server2client', function(data) {
		console.log(data);
		socket.emit('adminConnected',{});
});
socket.on('uploadSuccess', function(data) {
	console.log(data);
	afterUploadSuccess(data);
});
socket.on('uploadFail', function(data) {
	afterUploadFail(data);
});

socket.on('algoCompleted', function(algoIndex) {
	console.log("Algo "+algoIndex+" completed");
	algoCompleted(algoIndex);
});
socket.on('algoFault', function(msg) {
	console.log(msg);
	alert(msg);
});

socket.on('server2admin', function(data){
	var loadedFiles = '';
	if (data.algos.length > 0){
		if (data.flag === false){
			document.getElementById("browseButton").disabled = "";
			document.getElementById("uploadButton").disabled = "";
			for (var i=0; i<data.algos.length; i++){
				loadedFiles += '<div>' + data.algos[i].file + "  " + data.algos[i].name + "  " +
				"  " + data.algos[i].ver + "  " + data.algos[i].desc +
				'<input type="button" name="startButton" id="start'+i+'Button" value="Start" title="Click to activate the algorithm" onclick="startAlgo('+i+')"/>' +
				'<input type="button" name="stopButton" id="stop'+i+'Button" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo('+i+')" disabled="disabled"/>' +
				'</div>';
			}
		}else{
			document.getElementById("browseButton").disabled = "disabled";
			document.getElementById("uploadButton").disabled = "disabled";
			for (var i=0; i<data.algos.length; i++){
				loadedFiles += '<div>' + data.algos[i].file + "  " + data.algos[i].name + "  " +
				"  " + data.algos[i].ver + "  " + data.algos[i].desc +
				'<input type="button" name="startButton" id="start'+i+'Button" value="Start" title="Click to activate the algorithm" onclick="startAlgo('+i+')" disabled="disabled"/>' +
				'<input type="button" name="stopButton" id="stop'+i+'Button" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo('+i+')" disabled="disabled"/>' +
				'</div>';
			}
		}
		document.getElementById("loadedFiles").innerHTML = loadedFiles;
		if (document.getElementById("stop"+data.flag+"Button") !== null)
			document.getElementById("stop"+data.flag+"Button").disabled = "";
		document.getElementById("loadFilesForm").filename.value = "";
	}else{
		document.getElementById("loadedFiles").innerHTML = "No algorithms loaded";
	}
});

function init() {
	document.getElementById("loadFilesForm").onsubmit=function() {
		document.getElementById("loadFilesForm").target = 'upload_target'; //'loadFilesForm' is the name of the iframe
	};
}
window.onload=init;

var file;

loadFile = function(){
	file = document.getElementById("loadFilesForm").filename.value;
	if (file !== ""){
		document.getElementById("loadedFiles").innerHTML = "Proccessing uploaded algorithm, please hold.";
		socket.emit('upload', file);
	}
};

afterUploadSuccess = function(data){
	document.getElementById("browseButton").disabled = "";
	document.getElementById("uploadButton").disabled = "";
	var loadedFiles = '';
	for (var i=0; i<data.length; i++){
		loadedFiles += '<div>' + data[i].file + "  " + data[i].name + "  " +
		"  " + data[i].ver + "  " + data[i].desc +
		'<input type="button" name="startButton" id="start'+i+'Button" value="Start" title="Click to activate the algorithm" onclick="startAlgo('+i+')"/>' +
		'<input type="button" name="stopButton" id="stop'+i+'Button" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo('+i+')" disabled="disabled"/>' +
		'</div>';
	}
	
	document.getElementById("loadedFiles").innerHTML = loadedFiles;
	document.getElementById("loadFilesForm").filename.value = "";
};

afterUploadFail = function(data){
	alert("Upload Failed!");
	var loadedFiles;
	if (data.length > 0){
		loadedFiles = '';
		for (var i=0; i<data.length; i++){
			loadedFiles += '<div>' + data[i].file + "  " + data[i].name + "  " +
			"  " + data[i].ver + "  " + data[i].desc +
		'<input type="button" name="startButton" id="start'+i+'Button" value="Start" title="Click to activate the algorithm" onclick="startAlgo('+i+')"/>' +
		'<input type="button" name="stopButton" id="stop'+i+'Button" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo('+i+')" disabled="disabled"/>' +
		'</div>';
		}
	}else{
		loadedFiles = "No algorithms loaded";
	}
	document.getElementById("loadedFiles").innerHTML = loadedFiles;
	document.getElementById("loadFilesForm").filename.value = "";
};

startAlgo = function(index){
	socket.emit('startAlgo', index);
	var startButtons = document.getElementsByName("startButton");
	var stopButtons = document.getElementsByName("stopButton");
	//var resultsButtons = document.getElementsByName("resultButton");
	for (var i=0; i<startButtons.length; i++){
		startButtons[i].disabled = "disabled";
		stopButtons[i].disabled = "disabled";
		//resultsButtons[i].disabled = "disabled";
	}
	document.getElementById("stop"+index+"Button").disabled = "";
	document.getElementById("browseButton").disabled = "disabled";
	document.getElementById("uploadButton").disabled = "disabled";
};

stopAlgo = function(index){
	socket.emit('stopAlgo', {});
	var startButtons = document.getElementsByName("startButton");
	var resultsButtons = document.getElementsByName("resultButton");
	for (var i=0; i<startButtons.length; i++){
		startButtons[i].disabled = "";
		//resultsButtons[i].disabled = "disabled";
	}
	document.getElementById("stop"+index+"Button").disabled = "disabled";
	document.getElementById("browseButton").disabled = "";
	document.getElementById("uploadButton").disabled = "";
};

getResult = function(){
	socket.emit('getResult',{});
	/*document.getElementById("startButton").disabled = "";
	document.getElementById("stopButton").disabled = "disabled";
	document.getElementById("browseButton").disabled = "";
	document.getElementById("uploadButton").disabled = "";
	document.getElementById("resultsButton").disabled = "disabled";*/
}

algoCompleted = function(algoIndex){
	document.getElementById("stop"+algoIndex+"Button").disabled = "disabled";
	var results = '<input type="submit" id="resButton" value="Get Result"/>';
	document.getElementById("results").innerHTML = results;
}