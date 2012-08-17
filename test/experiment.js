var toType = function(obj){
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
var path = "./div.js";
var code = require (path);
console.log(toType(code));
var doit = new code();
doit.sayHello();
