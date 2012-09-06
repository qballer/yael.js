var fs = require('fs');

var testUtil = function (){
	var that = {};
	
	that.loadJSONfile =function (filename, encoding) {
		try {
			console.log(filename);
			// default encoding is utf8
			if (typeof (encoding) === 'undefined') encoding = 'utf8';
		
			// read file synchroneously
			var contents = fs.readFileSync(filename, encoding);
			// parse contents as JSON
			return JSON.parse(contents);
		
		} catch (err) {
			// an error occurred
			throw err;
		}
	};

	return that;


};
module.exports = testUtil;