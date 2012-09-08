
var dbContext = function (){
	var that = {};
	that.divide = function (){};
	that.isDividerDone = function (){return false;};
	that.sendToAssembler = function(){};
	return that;
};
module.exports = dbContext;