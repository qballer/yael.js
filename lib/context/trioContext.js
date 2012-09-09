var yaelDB = require('../db/yaelDB'),
	broadway = require('broadway');
	context = require('./context');

/**
* @description
* responsibile for connecting the control layer
* to the Divider/Assembler layer
*
*/

var layer = function(){
	var that = {};
	var trioContext = null,
		app = null;

	/**
	*  @method -Responsibile for creating trioContext.
	*			Creates dbContext
	*  @param pathToAlgoFolder = the full path to the folder where the user code lives.
	*  @param algoID = the algoID
	*/

	that.startPlugin = function (pathToAlgoFolder, algoID){
		if (trioContext !== null){
			console.log("Warnning: Context is not empty");
		}
		trioContext = {};
		



	};
	//
	//sho
	//
	that.stopPlugin = function(){

	};

	return that;
};


//Creating yaelDB context
