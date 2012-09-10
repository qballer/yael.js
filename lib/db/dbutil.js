var nakedSlice = require('../api/etc/nakedSlice');

var dbutil = function (){
	var that = {};
	var sep = '|';

	that.consumeCallBacks = function (list){
		while (list.length > 0){
			setTimeOut(list.shift(),0,null);
		}
	};

	that.handdleValue = function(err, reply, json){
		if (reply !== null){
			var array = that.stringToJsonNArray(reply);
			console.log("array[0]:" + array[0]);
			var slice = new nakedSlice(10);
			slice.buffer = array[0];
			if (json){
				slice.jsonAssmeblyObject = array[1];
			}
			return slice;
		}else{
			return null;
		}
	};
	
	that.sliceToString = function (slice){
		var json = slice.jsonAssmeblyObject;
		var length = 0, buffIndex = 0;
		var jsonString = "";
		
		if (json !== null){
			jsonString = JSON.stringify(json);
			length = jsonString.length;
		}

		var arraySTR = String.fromCharCode.apply(null, new Uint16Array(slice.buffer));
		length += length.toString().length + arraySTR.length + 2;

		var buff = new Buffer(length);
		buffIndex = buff.write(jsonString.length.toString());
		buffIndex += buff.write(sep, buffIndex);
		buffIndex += buff.write(jsonString, buffIndex);
		buffIndex += buff.write(sep, buffIndex);
		buffIndex += buff.write(arraySTR, buffIndex);

		return buff.toString();
	};

	that.stringToJsonNArray = function(string){
		console.log(string);
		var i=0,j=0;
		var lenStr="", jsonStr="";

		while(string[i]!==sep){
			lenStr += string[i++];
		}

		jsonSize = Number(lenStr);
		i = Number(lenStr)+lenStr.length+2;
		jsonStr = string.substring(lenStr.length + 1, lenStr.length + 1 + jsonSize);

		var slice = new ArrayBuffer((string.length - i)*2); // 2 bytes for each char
		var bufView = new Uint16Array(slice);
		for (j=0; i<string.length; ++i,++j){
			bufView[j] = string.charCodeAt(i);
		}
		console.log(jsonStr);
		var jsonObj = JSON.parse(jsonStr);
		
		return [slice,jsonObj];
	};

	that.clientOn = function (client){
		client.on("error", function (err) {
			console.log("Error " + err);
		});
	};
	
	return that;
};
module.exports = new dbutil();