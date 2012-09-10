var pile = function (feed){
	var that = {};
	var pArray = [];
	var done = false;

	that.add=function(callback, data){
		if (!that.isDone()){
			pArray.push([callback,data]);
		}
	};

	that.run = function(){
		if(!that.isDone()){
			var element = null,
				callback = null,
				data = null;
			if (!that.isEmpty()){
				element = pArray.shift();
				callback = element.shift();
				data = element.shift();
				callback(data);
			}else{
				that.feeder();
			}
		}else{
			console.log("I'm Done");
		}
	};

	that.isDone = function (){
		return done;
	};

	that.Done = function(){
		done = true;
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