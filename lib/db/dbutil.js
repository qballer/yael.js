var nakedSlice = require('../api/etc/nakedSlice');
var dbutil = function (){
	var that = {};
	var sep = ':';

	that.sliceToString = function (slice){
		var json = slice.jsonAssmeblyObject;
		var length = 0;
		var string = "";
		if (json !== null){
			string = JSON.stringify(json);
			length = string.length;
		}
		arraySTR = String.fromCharCode.apply(null, new Uint16Array(slice.buffer));
		length += length.toString().length + slice.buffer.length + 2;

		var buf = new Buffer(length);
		buf.write(string.length.toString());
		buf.write(sep);
		buf.write(string);
		buf.write(sep);
		buf.write(arraySTR);
		return buf.toString();
	};

	that.stringToJsonNArray = function(string){

		var i=0;
		var buffer = new Buffer(10);
		while(string[i]!==sep){
			buffer.write(string[i++]);
		}
		buffer[i] = '\0';
		strLen = buffer.toString();
		i = Number(strLen)+strLen.length+2;
		var slice = new ArrayBuffer((string.length - i)*2 +1); // 2 bytes for each char
		var bufView = new Uint16Array(slice);
		for (; i<string.length; ++i){
			bufView[i] = string.charCodeAt(i);
		}
		var jsonObj = JSON.parse(new Buffer(string,strLen.length+1,Number(strLen).toString));
		
		return [slice,jsonObj];
	};
	
	return that;
};
module.exports = new dbutil();