var redis = require ('node_redis');
    client = redis.createClient();
    dbutil = require('./dbutil');
 
 client.on("error", function (err) {
        console.log("Error " + err);
 });
var yael = function(client, util){

	var that = {};
	that.client = client;
	that.util = util;

	that.writeSlice = function (slice){
		client.set(slice.ID, that.dbutil.sliceToString(slice), that.redis.print());
	};

	that.getSlice = function (cb, id){
		
	};

	that.getASlice = function(cb){

	};

	that.giveResult = function (slice){

	};

	that.getResult = function(){

	};

	that.removeSlice = function(id){

	};
	that.exist = function(id){

	};

	return that;
};

var prepareClient = function(){
	return new yael(client, dbutil);
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;