var dbContext = function (){
	var that = {};
	that.divide = function (){};
	that.isDividerDone = function (){return false;};
	that.sendToAssembler = function(slice){};
	
	return that;
};
module.exports = dbContext;
