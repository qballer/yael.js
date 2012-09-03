var fs = require("fs");

staticFileReader = function(filePath){
	fs.readFile(filePath, function (err, data) {
    	if (err) {
        	throw err;
    	}
    	return data;
	});
};

exports.staticFileReader = staticFileReader;