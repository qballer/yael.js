var fs = require("fs");

var staticFileReader = function (){
	var that = {};
	
	that.readStaticFile = function (filePath) {
		try {
			
			fs.readFile(filePath, function (err, data) {
    			if (err) {
        			throw err;
    			}
    			return data;
			});
		
		} catch (err) {
			// an error occurred
			throw err;
		}
	};

	return that;
	
};
module.exports = staticFileReader;