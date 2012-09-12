var dbContext = function (){
	var that = {};
	that.divide = function (){};
	that.isDividerDone = function (){console.log("THIS IS A BUG!!!");};
	that.sendToAssembler = function(slice){};
	
	return that;
};
module.exports = dbContext;
