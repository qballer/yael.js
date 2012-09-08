var exec = require('child_process').exec;
var path = require('path');
var initDB = function (){
	var that = {};
	
	that.startDB = function(){
		var str = 'redis-server';
		var cwdValue = path.resolve('../../config').toString();

		exec(str,function (err,out,stderr){
			console.log(out);
			if (err !== null){
					console.log('err' + err);
					process.exit(1);
				}
			}, {"cwd":cwdValue});
	};

	that.creatContext = function(divide,isDividerDone,sendToAssembler){
		var context = {};
		context.divide = divide;
		context.isDividerDone = isDividerDone;
		context.sendToAssembler =sendToAssembler;
		return context;
	};

	return that;
};

var prepareInit = function(){
	return new initDB();
};
var initI = initI || prepareInit();

module.exports = initI;
initI.startDB();
