var formidable = require("formidable");
var http = require("http");
var url = require("url");
var validator = require("./serverTools/validation");
var fileReader = require("./serverTools/staticFileReader");
var nakedSlice = require("../api/etc/nakedSlice");
var trioContext = require("../context/trioContext");
var db = require ('../db/yaeldb.js');
//testing object:
var temp = 1;
var sliceID = 0;
var algoReady = false; //if algo is loaded - algoReady = loaded algo ID.
var LoadedClientAlgoScript = null;
var algos = [];
var number = 1;
var MaxInt = /*4294967295*/150;
trioContext = new trioContext();

function getAlgoReadyVal(){
  return algoReady;
}
function getAlgoNumber(){
  return algos.length;
}
function getLoadedClientAlgoScript(){
  return LoadedClientAlgoScript;
}


function start(route, routes) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(routes, pathname, response, request);
  }

  getNewSlice = function(cb){
    db.getASlice(cb);
  };

  getsliceZero = function(){
    var sliceZero = db.getSliceZero();
    return sliceZero;
  };

  storeResultSlice = function(object){
    var bufferSize = object.buffer.byteLength;
    var ResultSlice = new nakedSlice(bufferSize);
    ResultSlice.ID = object.ID;
    ResultSlice.buffer = object.buffer;
    bitView = new Uint8Array(ResultSlice.buffer);
    
    db.giveResult(ResultSlice);
  };


  var server = http.createServer(onRequest);
  server.listen(8000);

  var io = require('socket.io').listen(server);

  console.log("Server has started.");
  
  io.sockets.on('connection', function(socket) {
    //Emit connection event
    socket.emit('server2client', {data: 'connectionEstablished'});
    
    //incoming event handling:
    socket.on('getsliceZero', function() {
      socket.emit('sliceZero', getsliceZero());  
      console.log("Sent Slice Zero");
    });
    
    socket.on('sliceZeroProcessed', function() {
      console.log("sliceZeroProcessed event");
      getNewSlice(function(slice){
        if (slice !== null){
          
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
      
      storeResultSlice(data);
      getNewSlice(function(slice){
        if (slice !== null){
          
          socket.emit('nakedSlice', slice);
        }
        else
        {
          console.log("Reached no slices available");
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
    
    socket.on('adminConnected', function(){
      console.log('admin connected');
      socket.emit('server2admin', { algos: algos,
                                    flag: algoReady });
    });

    socket.on('startAlgo', function(algoIndex){
      console.log('start Algo');
      var algoScript = algos[algoIndex].algoScript;
      console.log(__dirname + "/../../data/algos/algo"+algoIndex+"/"+algoScript);
      fileReader.readStaticFile(__dirname + "/../../data/algos/algo"+algoIndex+"/"+algoScript, 
        function(data){
          LoadedClientAlgoScript = data;
          console.log("after client.js read");
          trioContext.startPlugin(algos[algoIndex].algoPath, algoIndex, function(msg, path2File){
            console.log("algo processing ended");
            if (path2File !== null){
              console.log("algo completed");
              algoReady = false;
              trioContext.stopPlugin();
              //toDo: store path2file for later usage
              socket.emit('algoCompleted', algoIndex);
            }else{
              console.log("algo stopped on error");
              //toDo: socet emit event to alert msg
              socket.emit('algoFault',msg);
            }
          });
          algoReady = algoIndex;
          console.log(algoReady);
        });
    });

    socket.on('stopAlgo', function(){
      console.log('stop Algo');
      algoReady = false;
      trioContext.stopPlugin();
    });
    
    socket.on('upload', function(file){
        validator.validateZippedAlgo(function(data){
          console.log("in cbFunc");
          if (data.algoFlag === true){
            algos[algos.length] = {file: file,
                                   name: data.algo.name,
                                   desc: data.algo.desc,
                                   ver: data.algo.ver,
                                   algoScript: data.algo.algoScript,
                                   algoPath: data.algo.algoPath };
            console.log("validated algo name: " + data.algo.name);
            console.log("path to validated algo dir: " + data.algo.algoPath);
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
exports.getLoadedClientAlgoScript = getLoadedClientAlgoScript;