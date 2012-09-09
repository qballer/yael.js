var nakedSlice = require('../api/etc/nakedSlice');
var redis = require ('redis');
var dbutil = require('./dbutil');
var context = require('./dbContext');

 

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
	// connect client 1 to db 1
	client[sendID].select(sendID, function() {
		console.log('connected to '+ sendID);
	});
	//
	that.dbContext = new context();

	var passSliceToAssembler = function(result,json){
		result.jsonAssmeblyObject = json.jsonAssmeblyObject;
		that.dbContext.sendToAssembler(result);
	};
	
	var getSliceByAction = function (cb, id,json, func){
		var sent = sendID;
		var fresh = freshID;
		that.client[sent][func](id,function (err,reply){
			var value = that.dbutil.handdleValue(err,reply, json);
			if (value === null){
				that.client[fresh][func](id,function (err,reply){
					value = that.dbutil.handdleValue(err,reply,json);
					if (value !==null){
						value.ID = id;
					}
					cb(value);
				});
			}else{
				value.ID = id;
				cb(value);
			}
		});

	};
	var performMoves = function(id, cb, arg){
		that.client[freshID].send_command(
			"MOVE " + id +" " +sendID ,
			function (err, reply){
				cb.apply(this, arg);
			});
	};
	var emitCallbackOnslice = function (slice){
		if (yaelDBCallback.length >0){
			var cb = yaelDBCallback.shift();
			slice.jsonAssmeblyObject = null;
			cb(slice);
		}
	};
	var switchClients = function(){
		freshID = (freshID +1)% 2;
		sendID = (sendID +1)%2;
	};

	that.writeSlice = function (slice){
		that.client[freshID].set(slice.ID, that.dbutil.sliceToString(slice),function(){
			if (yaelDBCallback.length > 0){
				performMoves(slice.ID, emitCallbackOnslice, [slice]);
			}
		});
	};

	that.getSlice = function (cb, id,json){
		getSliceByAction(cb, id,json, "GET");
	};

	var times = 0;
	that.getASlice = function(cb){
		that.client[freshID].send_command("RANDOMKEY", function (err, reply){
			if (reply === null){
				if (that.context.isDividerDone()){
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
					that.context.divide();
				}
			}else{
				times=0;
				performMoves(reply,getSlice,[cb,reply,false]);
			}
		});
	};

	that.giveResult = function (slice){
		var sent = sendID;
		var fresh = freshID;
		getSliceByAction(function (sl){
			if(sl !== null){
				that.client[sent].del(sl.id,function (err,reply){
					if (reply ===0){
						that.client[fresh].del(sl.id,function (err,reply){
							if (reply >0){
								passSliceToAssembler(slice,sl);
							}else{
								console.log("Duplicate slice");
							}
						});
					}else{
						passSliceToAssembler(slice,sl);
					}
				});
				
			}
		}, slice.id,true, "GET");
	};
	that.flushDB = function(){
		that.client[freshID].send_command("FLUSHDB",function (err,reply,report){
			console.log("reply on flashDB: " +reply );
		});
	};

	return that;
};

var prepareClient = function(){
	return new yael();
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;