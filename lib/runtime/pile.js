var pile = function (size, feed, dicide){
	var that = {};
	var pArray = [size];
	var done = null;

	that.add=function(callback, argu){
		pArray.push([callback, argu]);
	};

	that.run = function(){
		var elem = null, func = null, args =null;
		if (that.isEmpty() && !that.isDone()){
			elem = pArray.shift();
			func = elem.shift();
			args = elem.shift();
			func(args);
		}
	};

	that.isDone = function (){
		return done !== null;
	};

	that.Done = function(){
		done = {};
	};
	that.isEmpty = function (){
		return pArray.length === 0;
	};

	that.feeder = function (){
		if (that.isEmpty() && !that.isDone()){
			call(feed);
		}
	};

	//should be non blocking and return a boolean value
	that.dicide = dicide;
	return that;
};

module.exports = pile;