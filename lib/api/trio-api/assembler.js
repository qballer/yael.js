var assembler = function (AssemMessageBox){
	var that = {};
	
	that["proccesResult"] = function (){};
	that["finalResult"] = function(){};
	that["AssemMessageBox"] = AssemMessageBox;

	return that;
};
module.exports = assembler;