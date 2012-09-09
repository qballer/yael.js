var dbutil = function (){
	var that = {};
	var sep = '|';

	that.handdleValue = function(err, reply, json){
		if (reply !== null){
			var array = that.dbutil.stringToJsonNArray(reply);
			var slice = new nakedSlice(1);
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
		var length = 0;
		var string = "", outputStr = "";
		if (json !== null){
			string = JSON.stringify(json);
			length = string.length;
		}

		var arraySTR = String.fromCharCode.apply(null, new Uint16Array(slice.buffer));
		length += length.toString().length + slice.buffer.length + 2;

		//using Buffer didn't work :( - using string instead
		outputStr = string.length.toString() + sep + string + sep + arraySTR;

		return outputStr;
	};

	that.stringToJsonNArray = function(string){
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