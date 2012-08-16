var assembler = function (AssemMessageBox){
	var that = {};
	
	// -- Broadway plugin --
	that["name"]   = "string";
	that["init"]   = function (){};
	that["attach"] = function (){};
	that["detach"] = function (){};
	
	// -- Algorith --
	that["proccesResult"] = function (){};
	that["finalResult"] = function(){};
	that["AssemMessageBox"] = AssemMessageBox;

	return that;
};
module.exports = assembler;