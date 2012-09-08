var nakedSlice = require('../api/etc/nakedSlice');
var redis = require ('redis');
    dbutil = require('./dbutil');
 

var yael = function(){
	var that = {};
	
	var freshID = 0;
	var sendID = 1;

	that.client = {};
	that.client[freshID] = redis.createClient();
	that.client[sendID] = redis.createClient();

	that.dbutil = dbutil;
	yaelDBCallback = [];

	that.dbutil.clientOn(that.client[freshID]);
	that.dbutil.clientOn(that.client[sendID]);

	//TODO:
	// divide();
	// isDividerDone
	emitCallbackOnslice = function (slice){
		var cb = yaelDBCallback.shift();
		slice.jsonAssmeblyObject = null;
		cb(slice);
	};
	var switchClients = function(){
		freshID = (freshID +1)% 2;
		sendID = (sendID +1)%2;
	};

	that.writeSlice = function (slice){
		client[freshID].set(slice.ID, that.dbutil.sliceToString(slice),function(){
			if (yaelDBCallback.length > 0){
				that.client[freshID].send_command(
				"MOVE " + slice.ID +" " +sendID ,
				function (err, reply){
					if (yaelDBCallback.length > 0){
						emitCallbackOnslice(slice);
					}
				});
			}
		});
	};

	that.getSlice = function (cb, id,json){
		var sent = sendID;
		var fresh = freshID;
		that.client[sent].get(id,function (err,reply){
			var value = that.dbutil.handdleValue(err,reply, json);
			if (value === null){
				that.client[fresh].get(id,function (err,reply){
					value = that.dbutil.handdleValue(err,reply,json);
					if (value !==null){
						value.ID = id;
					}
					cb(value);
				});
			}else{
			
				cb(value);
			}
		});
	};

	var times = 0;
	that.getASlice = function(cb){
		that.client[freshID].send_command("RANDOMKEY", function (err, reply){
			if (reply === null){
				if (isDividerDone()){
					switchClients();
					if (times===0){
						times=1;
						getASlice(cb);
					}else{
						times=0;
						cb(null);
					}
				}else{
					times = 0;
					yaelDBCallback.push(cb);
					divide();
				}
			}else{
				times=0;
				getSlice(cb,reply,false);
			}
		});
	};

	that.giveResult = function (slice){
		
	};

	removeSlice = function(id){

	};
	return that;
};

var prepareClient = function(){
	return new yael();
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;