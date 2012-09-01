var fileLoader = require(__dirname + "/etc/tssDasLoader");
var dividerInterface = require(__dirname + "/trioAPI/divider");
var assemblerInterface = require(__dirname + "/trioAPI/assembler");
var assembleWrapper = require("./implementation/assemblerWrapper");
var dividerWrapper = require("./implementation/dividerWrapper");

var trio = function (){
	var that = {};

	that.name = "tssDasTrio";
	
	that.attach = function (options){
		var loader = new fileLoader(),
			userDivider = null,
			userAssembler = null;
		that.contex = options;
		userDivider = loader.fileLoad(options.pathToDivider, new dividerInterface());
		userAssembler = loader.fileLoad(options.pathToAssembler, new assemblerInterface());

		console.log("Divider:" +userDivider);
		console.log("Assembler:" +userAssembler);

		if (userDivider !== null && userAssembler !== null){
			//divider setup
			this.divider = new dividerWrapper(userDivider);
			that.divider = this.divider;
			this.divider.writeToDB = options.writeToDB;
			this.divider.giveToNetwork = options.giveToNetwork;
			this.divider.errorHalt = options.errorHalt;
			this.divider.pathToFolder = options.pathToFolder;
			//assembler setUp
			that.divider = this.assembler = new assemblerWrapper(userAssembler);
			this.assembler.grandHalt = options.grandHalt;
			this.assembler.takeResultFromNetwork = options.takeResultFromNetwork;
			this.assmbler.errorHalt = options.errorHalt;
			this.assmbler.pathToFolder = options.pathToFolder;
		}else{
			console.log("This is wrong!");
			options.errorHalt("Didn't Work Out");
		}
		// TODO: perform client prepartion
	};

	that.init = function (callback){
		console.log(that.divider);
		console.log(that.assembler);
		setTimeout(0,callback);
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