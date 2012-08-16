var pile = function (size){
	var that = {};
	var pile = new Array(size);

	that.add=function(callback, argu){
		pile.push([callback, argu]);
	};	

	that.run =function(next){

	};

	return that;
};

module.exports = pile;