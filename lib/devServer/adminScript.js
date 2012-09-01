var socket = io.connect('http://localhost');

socket.on('server2admin', function(data) {
		console.log(data);
});
socket.on('uploadSuccess', function(data) {
		afterUploadSuccess();
});
socket.on('uploadFail', function(data) {
		afterUploadFail();
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
		socket.emit('upload',{});
	}
};

afterUploadSuccess = function(){
	document.getElementById("browseButton").disabled = "disabled";
	document.getElementById("uploadButton").disabled = "disabled";
	var loadedFiles = '<div>' + file + 
		'<input type="button" id="start" value="Start" title="Click to say Hello to server" onclick="sayHello()"/>' + 
		'<input type="button" id="stop" value="Stop" disabled="disabled"/>' + 
		'</div>';
	document.getElementById("loadedFiles").innerHTML = loadedFiles;
	document.getElementById("loadFilesForm").filename.value = "";
};

afterUploadFail = function(){
	alert("upload failed");
	document.getElementById("loadFilesForm").filename.value = "";
};

sayHello = function(){
		socket.emit('adminConnected', { data: 'HelloFromAdmin' });
		var loadedFiles = '<div>' + file + 
		'<input type="button" id="start" value="Start" disabled="disabled" onclick="sayHello()"/>' + 
		'<input type="button" id="stop" value="Stop"/>' + 
		'</div>';
	document.getElementById("loadedFiles").innerHTML = loadedFiles;
};
