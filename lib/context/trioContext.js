var yaelDB = require('../db/yaelDB'),
	broadway = require('broadway'),
	context = require('./context'),
	util = require('util'),
	path = require('path'),
	testUtil = require('../../test/testUtil');

/**
* @description
* responsibile for connecting the control layer
* to the Divider/Assembler layer
*
*/

var layer = function(){
	var that = {};
	var ctxt= null,
		dbCtxt =null;
		app = new broadway.App();

	var creatDBContext = function (){
		dbCtxt = {};
		dbContext.divide = app.dividerWrapper.pile.run();
		dbContext.isDividerDone =app.dividerWrapper.isDone;
		dbContext.sendToAssembler = app.assemblerWrapper.giveResult;
	};


	var createContext = function (pathToAlgoFolder,algoID){
		if (ctxt !== null){
			console.log("Warnning: Context is not empty");
		}
		ctxt = new Context();
		var json = testUtil.loadJSONfile(pathToAlgoFolder+ '/trio.json');
		for (var key in json){
			ctxt[key] = json[key];
		}
		ctxt.pathToAlgo = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToAlgo);
		ctxt.pathToFolder = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToFolder);
		ctxt.pathToAssembler = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToAssembler);
		ctxt.pathToDivider = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToDivider);
		ctxt.writeToDB = yaelDB.writeSlice(slice);
		//TODO:
		//errorHalt(file) and resultHald(file);
	};
	/**
	*  @method -Responsibile for creating trioContext.
	*			Creates dbContext
	*  @param pathToAlgoFolder = the full path to the folder where the user code lives.
	*  @param algoID = the algoID
	*/


	that.startPlugin = function (pathToAlgoFolder, algoID){
		createContext(pathToAlgoFolder,algoID);
		app.use(new require("../api/trioPlugin"),ctxt);
		creatDBContext();
		yaelDB.dbContext = dbContext;
	};
	//
	//sho
	//
	that.stopPlugin = function(){
		dbCtxt = null;
		ctxt = null;
		yaelDB.flushDB();
		yaelDB.dbContext = null;
	};

	return that;
};
module.exports = layer;

//Creating yaelDB context
