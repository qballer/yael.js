var fs = require("fs");

var staticFileReader = function (filePath, cbFunc){
		
	try {
		fs.readFile(filePath, function (err, data) {
			if (err) {
    			console.log("client file read error");
    			//throw err;
			}
			cbFunc(data);
		});
		
	} 
	catch (err) {
		//throw err;
		console.log("client file read error");
		cbFunc(null);
	}
};

exports.readStaticFile = staticFileReader;

