var fileLoader = function(){
	var that = {};

	that.fileLoad= function (pathToFile, compare){
		var currentLoaded = require.cache;
		if (that.toType(currentLoaded[path.resolve(pathToFile)]) !== "undefined"){
			delete currentLoaded[path.resolve(pathToFile)];
		}

		var newCode = require(pathToFile);

		if (!(that.toType(newCode) === that.toType(compare) && that.validateCode(compare, newCode))){
			newCode = null;
		}
			
		return newCode;
	};

	that.toType = function(obj){
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	that.validateCode = function (source, validateMe){
		var allGood = true;
		for(var key in source){
			if (source.hasOwnProperty(key)){
				if (that.toTypeYe(key) !== that.toType(validateMe[key])){
					allGood = false;
					break;
				}
			}
		}
		return allGood;
	};

	return that;

};
module.exports = fileLoader;
