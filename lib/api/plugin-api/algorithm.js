var algorithm = function (AlgoMessageBox){
	var that = {};
	
	// -- Broadway plugin --
	that["name"]   = "string";
	that["init"]   = function (){};
	that["attach"] = function (){};
	that["detach"] = function (){};
	
	// -- Algorith --
	that["procceSlice"] = function (slice){};
	that["AlgoMessageBox"] = AlgoMessageBox;

	return that;
};

module.exports = algorithm;