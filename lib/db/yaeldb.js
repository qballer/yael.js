var nakedSlice = require('../api/etc/nakedSlice');
var redis = require ('redis');
var dbutil = require('./dbutil');
var context = require('./dbContext');
var util = require('util');
 

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
	that.client[sendID].select(sendID, function() {
		console.log('connected to '+ sendID);
	});
	//
	that.dbContext = new context();

	var passSliceToAssembler = function(result,json){
		result.jsonAssmeblyObject = json.jsonAssmeblyObject;
		console.log('Passing Slice To sendToAssembler:' + util.inspect(result.buffer));
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		that.dbContext.sendToAssembler(result);
		
	};
	
	var getSliceByAction = function (cb, id,json, action){
		var sent = sendID;
		var fresh = freshID;
		console.log("action: " + action +"\n" +
					"id: " + id + "\n" +
					"json: " + json + "\n"
			);

		that.client[sent][action](id,function (err,reply){
			var value = that.dbutil.handdleValue(err,reply, json);
			if (value === null){
					that.client[fresh][action](id,function (err,reply){
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
		var fresh = freshID;
		var send = sendID;
		that.client[fresh]["MOVE"](id,sendID,
			function (err, reply){
				if (reply===0){
					console.log('WARNING: MOVE FAILED - MAY THE DEMO GOD KILL YOU!');
				}
				that.client[freshID]['DEL'](id,function(){
					console.log('performMoves: reply=' + reply);
					console.log('performMoves: err=' + err);
					cb.apply(this, arg);
				});
				
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

	that.dividerIsDoneEvent = function(){
		var send = sendID;
		var fresh = freshID;
		that.client[fresh]["RANDOMKEY"](function (err, reply){
			if (reply === null){
				that.client[send]["RANDOMKEY"](function (err, reply){
					if(reply === null){
						that.dbutil.consumeCallBacks(yaelDBCallback);
					}
				});
			}
		});

	};

	that.writeSlice = function (slice){
		console.log('Got Slice:' + slice.ID);
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
		that.client[freshID]["RANDOMKEY"](function (err, reply){
			if (reply === null){
				console.log("got null from db");
				console.log("that.dbContext.isDividerDone(): "+that.dbContext.isDividerDone);
				if (that.dbContext.isDividerDone()){
					console.log("divider is done");
					switchClients();
					if (times===0){
						times=1;
						that.getASlice(cb);
					}else{
						that.dbutil.consumeCallBacks(yaelDBCallback);
						times=0;
						cb(null);
					}
				}else{
					console.log("divider not done");
					times = 0;
					yaelDBCallback.push(cb);
					that.dbContext.divide();
				}
			}else{
				times=0;
				console.log("getASlice");
				performMoves(reply,that.getSlice,[cb,reply,false]);
			}
		});
	};

	that.giveResult = function (slice){
		
		var sent = sendID;
		var fresh = freshID;
		console.log('correct slice ID id? '+ slice.ID);

		getSliceByAction(function (json){
			if(json !== null){
				console.log('giveResult slice.id level 1' + slice.ID);
				that.client[sent].del(slice.ID,function (err,reply){
					if (reply ===0){
						that.client[fresh].del(slice.ID,function (err,reply){
							if (reply >0){
								console.log("GOOD");
								passSliceToAssembler(slice,json);
							}else{
								console.log('something went terriably wrong');
							}
						});
					}else{
						passSliceToAssembler(slice,json);
					}
				});
			}else{
				console.log("discarding slice" + json);
			}
		}, slice.ID,true, "GET");
	};
	that.flushDB = function(){
		var send = sendID;
		var fresh = freshID;
		that.client[send].send_command("FLUSHDB",function (err,reply){
			console.log("reply on flashDB: " +reply );
		});
		that.client[fresh].send_command("FLUSHDB",function (err,reply){
			console.log("reply on flashDB: " +reply );
		});
	};
	that.takeSliceZero = function (sliceFromToDivider){
		that.SliceZero = sliceFromToDivider;
	};
	that.getSliceZero = function (slice){
		return that.getSliceZero;
	};
	return that;
};

var prepareClient = function(){
	return new yael();
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;