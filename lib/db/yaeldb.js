var nakedSlice = require('../api/etc/nakedSlice');
var redis = require ('node_redis');
    dbutil = require('./dbutil');
 
 client.on("error", function (err) {
        console.log("Error " + err);
 });
var yael = function(){

	var that = {};
	
	var freshID = 0;
	var sendID = 0;

	that.client['fresh'] = redis.createClient();
	that.client['send'] = redis.createClient();
	
	that.dbutil = dbutil;

	that.writeSlice = function (slice){
		client.set(slice.ID, that.dbutil.sliceToString(slice), that.redis.print());
	};

	that.getSlice = function (cb, id, json){
		that.client.get(id,function(err,reply){
			if (reply !== null){
				var array = that.dbutil.stringToJsonNArray(reply);
				var slice = new nakedSlice(1);
				slice.buffer = array[0];
				if (json !== null){
					slice.jsonAssmeblyObject = array[1];
				}
				cb(slice);
			}else{
				cb(null);
			}
		});
	};

	that.getASlice = function(cb){
		that.client['fresh'].send_command("RANDOMKEY", function (err,reply){

		});
	};

	that.giveResult = function (slice){
		
	};

	that.removeSlice = function(id){

	};

	var switchClients = function(){

	};

	var findID = function(cb, args){

	};

	return that;
};

var prepareClient = function(){
	return new yael();
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;