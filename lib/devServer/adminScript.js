var socket = io.connect('http://localhost');

socket.on('server2client', function(data) {
		console.log(data);
		socket.emit('adminConnected',{});
});
socket.on('uploadSuccess', function(data) {
	console.log(data);
	afterUploadSuccess(data);
});
socket.on('uploadFail', function(data) {
	afterUploadFail();
});
socket.on('server2admin', function(data){
	if (data.algos.length > 0){
		document.getElementById("browseButton").disabled = "disabled";
		document.getElementById("uploadButton").disabled = "disabled";
		if (data.flag === false){
			var loadedFiles = '<div>' + data.algos[0] + 
				'<input type="button" id="startButton" value="Start" title="Click to activate the algorithm" onclick="startAlgo()"/>' + 
				'<input type="button" id="stopButton" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo()" disabled="disabled"/>' + 
				'</div>';
		}else{
			var loadedFiles = '<div>' + data.algos[0] + 
				'<input type="button" id="startButton" value="Start" title="Click to activate the algorithm" onclick="startAlgo()" disabled="disabled"/>' + 
				'<input type="button" id="stopButton" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo()"/>' + 
				'</div>';
		}
		document.getElementById("loadedFiles").innerHTML = loadedFiles;
		document.getElementById("loadFilesForm").filename.value = "";
	}else{
		document.getElementById("loadedFiles").innerHTML = "No algorithms loaded";
	}
});

function init() {
	document.getElementById("loadFilesForm").onsubmit=function() {
		document.getElementById("loadFilesForm").target = 'upload_target'; //'loadFilesForm' is the name of the iframe
	}
}
window.onload=init;

var file;

loadFile = function(){
	file = document.getElementById("loadFilesForm").filename.value;
	if (file != ""){
		socket.emit('upload', file);
	}
};

afterUploadSuccess = function(data){
	document.getElementById("browseButton").disabled = "disabled";
	document.getElementById("uploadButton").disabled = "disabled";
	var loadedFiles = '<div>' + data + 
		'<input type="button" id="startButton" value="Start" title="Click to activate the algorithm" onclick="startAlgo()"/>' + 
		'<input type="button" id="stopButton" value="Stop" title="Click to deactivate the algorithm" onclick="stopAlgo()" disabled="disabled"/>' + 
		'</div>';
	document.getElementById("loadedFiles").innerHTML = loadedFiles;
	document.getElementById("loadFilesForm").filename.value = "";
};

afterUploadFail = function(){
	alert("upload failed");
	document.getElementById("loadFilesForm").filename.value = "";
};

startAlgo = function(){
	socket.emit('startAlgo', {});
	document.getElementById("startButton").disabled = "disabled";
	document.getElementById("stopButton").disabled = "";
};

stopAlgo = function(){
	socket.emit('stopAlgo', {});
	document.getElementById("startButton").disabled = "";
	document.getElementById("stopButton").disabled = "disabled";
};