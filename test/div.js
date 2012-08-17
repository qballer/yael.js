var hello = function (){
	var that = {};
	that.sayHello = function (){
		console.log("Hello World\n");
	};
	return that;
};
module.exports = hello;