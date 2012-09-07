var redis = require ('node_redis');
    client = redis.createClient();

var yael = function(client){

	var that = {};
	that.client = client;

	that.writeSlice = function (slice){

	};

	that.getSlice = function (){

	};

	that.receiveResult = function (slice){

	};

	that.takeResultSlice = function(){

	};

	removeSlice = function(ID){

	};

	return that;
};

var prepareClient = function(){
	return new yael(client);
};
var yaeldb = yaeldb || prepareClient();

module.exports = yaeldb;