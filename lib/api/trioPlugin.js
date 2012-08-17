var trio = function (){
	var that = {};

	that.name = "TrioGenericPlugin";

	// TODO Write create code here and use as factory
	that.attach = function (options){
		this.divider = options.divider;
		this.assembler = option.assembler;
		this.contex = options.context;
	};

	that.init = function (callback){
		this.divider.getSliceZero();
		this.assembler.init();
	};

	that.detach = function(){
		delete this.divider;
		delete this.assembler;
		delete this.contex;
	};

	return that;

};
module.exports = trio;