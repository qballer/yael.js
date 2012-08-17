var pile = function (feed){
	var that = {};
	var pArray = [];
	var done = null;

	that.add=function(callback, data){
		if (!that.isDone()){
			pArray.push([callback,data]);
		}
	};

	that.run = function(){
		if (that.isEmpty()){
			pArray.shift();
		}else{
			that.feeder();
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
		if (!that.isDone()){
			feed();
		}
	};

	return that;
};

module.exports = pile;