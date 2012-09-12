var yaelDB = require('../db/yaeldb'),
	broadway = require('broadway'),
	context = require('./context'),
	util = require('util'),
	path = require('path'),
	testUtil = require('../../test/testUtil');

testUtil = new testUtil();
/**
* @description
* responsibile for connecting the control layer
* to the Divider/Assembler layerS
*/

var layer = function(){
	var that = {};
	var ctxt= null,
		dbCtxt =null;
		app = new broadway.App();

	var creatDBContext = function (){
		dbCtxt = {};
		dbCtxt.divide = app.dividerWrapper.pile.run;
		dbCtxt.isDividerDone =app.dividerWrapper.isDone;
		dbCtxt.sendToAssembler = app.assemblerWrapper.giveResult;
		dbCtxt.sendDoneToAssemblerWrapper = app.assemblerWrapper.assembler.finalResult;
	};


	var createContext = function (pathToAlgoFolder,algoID, resultCallbackToAdmin){
		if (ctxt !== null){
			console.log("Warnning: Context is not empty");
		}
		ctxt = new context();
		var json = testUtil.loadJSONfile(pathToAlgoFolder + '/trio.json');
		for (var key in json){
			ctxt[key] = json[key];
		}
		ctxt.algoID = algoID;
		ctxt.pathToAlgo = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToAlgo);
		ctxt.pathToFolder = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToFolder);
		ctxt.pathToAssembler = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToAssembler);
		ctxt.pathToDivider = path.resolve(pathToAlgoFolder + "/" + ctxt.pathToDivider);
		ctxt.writeToDB = yaelDB.writeSlice;
		ctxt.takeSliceZero = yaelDB.takeSliceZero;
		ctxt.giveResultToControl = resultCallbackToAdmin;
		ctxt.alertTheDB = yaelDB.dividerIsDoneEvent;
		

		//TODO:
		//errorHalt(file) and resultHald(file);
	};
	/**
	*  @method -Responsibile for creating trioContext.
	*			Creates dbContext
	*  @param pathToAlgoFolder = the full path to the folder where the user code lives.
	*  @param algoID = the algoID
	*/


	that.startPlugin = function (pathToAlgoFolder, algoID, resultCallbackToAdmin){
		console.log('resultCallbackToAdmin from control:' + resultCallbackToAdmin);
		createContext(pathToAlgoFolder,algoID, resultCallbackToAdmin);
		app.use(new require("../api/trioPlugin"),ctxt);
		app.init(function(){
			console.log("Init done");
		});
		creatDBContext();
		yaelDB.dbContext = dbCtxt;
	};
	//
	//sho
	//
	that.stopPlugin = function(){
		console.log("in stop plugin");
		dbCtxt = null;
		ctxt = null;
		yaelDB.flushDB();
		yaelDB.dbContext = null;
	};

	return that;
};
module.exports = layer;

//Creating yaelDB context
