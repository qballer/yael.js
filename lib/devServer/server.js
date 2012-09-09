var formidable = require("formidable");
var http = require("http");
var url = require("url");
var validator = require("./serverTools/validation");
var nakedSlice = require("../api/etc/nakedSlice");
var path = require('path');
var db = require ('../db/yaeldb.js');
//testing object:
var temp = 1;
var sliceID = 0;
var algoReady = false;
var algos = [];
var number = 1;
var MaxInt = 4294967295;

function getAlgoReadyVal(){
  return algoReady;
};
function getAlgoNumber(){
  return algos.length;
}

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  };

  getNewSlice = function(cb){
    db.getASlice(cb);
  };

  getsliceZero = function(cb){
    db.getsliceZero(cb);
  };

  storeResultSlice = function(slice){
    db.giveresult(slice);
  };

  // function getNewSlice(){
  //   var newSlice = new nakedSlice(100);
  //   newSlice.id = sliceID++;
  //   newSlice.buffer = new Uint32Array(16);
  //   for(var i = 0; i < 16 ; i++){
  //   if (number <= MaxInt){
  //         newSlice.buffer[i]=number;
  //           number++;
  //      }
  //      else{
  //         sliceFlag=false;
  //      }
  //    }
  //   console.log("NEW SLICE ID: " +newSlice.id + "\n\n");
  //   return newSlice;
  // };

  // function storeResultSlice(data){
  //   var resultSlice = new nakedSlice(100);
  //   resultSlice.id = data.id;
  //   resultSlice.buffer = data.buffer;
  //   /*
  //   TO DO:
  //   add functionalty to deliver result slice to assembler
  //   */
  // }

 
  // function sliceAvailable(){
  //   /*
  //   TO DO:
  //   add functionalty to check for available slice
  //   */
  //   if (temp < 100){
  //     temp++;
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  var server = http.createServer(onRequest);
  server.listen(8000);

  var io = require('socket.io').listen(server);
  
  // var sliceZero = new nakedSlice(100);
  // sliceZero.id = temp;
  // for(var i = 0; i < 100 ; i++){
  //   sliceZero.buffer[i]=i*2;
  // }

  console.log("Server has started.");
  
  io.sockets.on('connection', function(socket) {
    //Emit connection event
    socket.emit('server2client', {data: 'test'});
    
    //incoming event handling:
    socket.on('getsliceZero', function() {
      getsliceZero(function(slice){
        socket.emit('sliceZero', slice);  
      });
      console.log("Sent Slice Zero");
    });
    
    socket.on('sliceZeroProcessed', function() {
      getNewSlice(function(slice){
        if (slice !==){
          socket.emit('nakedSlice', slice);
        }
        else
        {
          socket.emit('noSliceAvailable',{});
        }  
      });
      console.log("Sent new NakedSlice");
    });
    
    socket.on('resultSlice', function(data) {
      console.log("Recived new ResultSlice");
      console.log(data);
      storeResultSlice(data);
      getNewSlice(function(slice){
        if (slice !==){
          socket.emit('nakedSlice', slice);
        }
        else
        {
          socket.emit('noSliceAvailable',{});
        }  
      });
    });

    socket.on('resultSliceStop', function(data) {
      console.log("Recived new ResultSlice");
      console.log(data);
      console.log("Client requested stop");
      storeResultSlice(data);
    });

    // socket.on('slice2client', function(){
    //   console.log("sending slice to client");
    //   socket.emit('slice',testSlice);
    // });
    
    socket.on('adminConnected', function(){
      console.log('admin connected');
      socket.emit('server2admin', { algos: algos,
                                    flag: algoReady });
    });

    socket.on('startAlgo', function(data){
      console.log('start Algo');
      algoReady = data;
    });

    socket.on('stopAlgo', function(){
      console.log('stop Algo');
      algoReady = false;
    });
    
    socket.on('upload', function(file){
        validator.validateZippedAlgo(function(data){
          console.log("in cbFunc");
          if (data.algoFlag === true){
            algos[algos.length] = {file: file,
                                   name: data.algo.name,
                                   desc: data.algo.desc,
                                   ver: data.algo.ver };
            console.log(data.algo.name);
            //console.log(algos[algos.length].name);
            socket.emit('uploadSuccess', algos);
          }
          else if (data.algoFlag === false){
            socket.emit('uploadFail', algos);
          }
          else console.log("error in validation");
        });    
    });
  });

}

exports.start = start;
exports.getAlgoReadyVal = getAlgoReadyVal;
exports.getAlgoNumber = getAlgoNumber;