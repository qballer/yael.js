var fileLoader = require("./etc/tssDasLoader");
var dividerInterface = require("./trioAPI/divider");
var assemblerInterface = require("./trioAPI/assembler");
var assembleWrapper = require("./implementation/assemblerWrapper");
var dividerWrapper = require("./implementation/dividerWrapper");


var trio = function (){
	var that = {};

	that.name = "tssDasTrio";

	
	that.attach = function (options){
		var loader = new fileLoader(),
			userDivider = null,
			userAssembler = null;
		this.contex = options;
		userDivider = loader.fileLoad(options.pathToDivider, new dividerInterface());
		userAssembler = loader.fileLoad(options.pathToAssembler, new assemblerInterface());
		if (userDivider !== null && userAssembler !== null){
			//divider setup
			this.divider = new dividerWrapper(new userDivider());
			this.divider.writeToDB = options.writeToDB;
			this.divider.giveToNetwork = options.giveToNetwork;
			this.divider.errorHalt = options.errorHalt;
			//assembler setUp
			this.assembler = new assemblerWrapper(new userAssembler());
			this.assembler.grandHalt = options.grandHalt;
			this.assembler.takeResultFromNetwork = options.takeResultFromNetwork;
			this.assmbler.errorHalt = options.errorHalt;
		}else{
			options.attachError();
		}
		// TODO: perform client prepartion
	};

	that.init = function (callback){
		this.divider.divider.getSliceZero();
		this.assembler.init();
		callback();
	};

	that.detach = function(){
		delete require.cache[path.resolve(this.contex.pathToDivider)];
		delete require.cache[path.resolve(this.contex.pathToAssembler)];
		delete this.divider;
		delete this.assembler;
		delete this.contex;
		// TODO: perform client close
	};

	return that;

};
module.exports = trio;