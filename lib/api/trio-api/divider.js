var divider = function (DivMessageBox){
	var that = {};
	
	// -- Broadway plugin --
	that["name"]   = "string";
	that["init"]   = function (){};
	that["attach"] = function (){};
	that["detach"] = function (){};
	
	// -- Algorith --
	that["divide"] = function (){};
	that["getSliceZero"] = function(){};
	that["DivMessageBox"] = DivMessageBox;

	return that;
};
module.exports = divider;