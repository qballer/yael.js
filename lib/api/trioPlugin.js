var fileLoader = require("./etc/tssDasLoader");
var dividerInterface = require("./trioAPI/divider");
var assemblerInterface = require("./trioAPI/assembler");
var assemblerWrapper = require("./implementation/assemblerWrapper");
var dividerWrapper = require("./implementation/dividerWrapper");

var trio = function (){
	var that = {};

	that.name = "tssDasTrio";
	
	that.attach = function (options){
		var loader = new fileLoader(),
			userDivider = null,
			userAssembler = null;
		userDivider = loader.fileLoad(options.pathToDivider, new dividerInterface());
		userAssembler = loader.fileLoad(options.pathToAssembler, new assemblerInterface());

		if (userDivider !== null && userAssembler !== null){
			//divider setup
			this.dividerWrapper = new dividerWrapper(userDivider);
			this.dividerWrapper.context = options;
			this.dividerWrapper.writeToDB = options.writeToDB;
			this.dividerWrapper.errorHalt = options.errorHalt;
			this.dividerWrapper.pathToFolder = options.pathToFolder;
			//assembler setUp
			this.assemblerWrapper = new assemblerWrapper(userAssembler);
			this.assemblerWrapper.context = options;
			this.assemblerWrapper.grandHalt = options.grandHalt;
			this.assemblerWrapper.errorHalt = options.errorHalt;
			this.assemblerWrapper.pathToFolder = options.pathToFolder;
			this.assemblerWrapper.giveResultToControl = options.giveResultToControl;
		}else{
			console.log("This is wrong!");
			options.errorHalt("Didn't Work Out");
		}
		// TODO: perform client prepartion
	};

	that.init = function(callback){
		this.dividerWrapper.divider.getSliceZero();
		this.assemblerWrapper.assembler.init();
		setTimeout(callback,0);
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
module.exports = new trio();