var formidable = require("formidable");
var http = require("http");
var url = require("url");
var validator = require("./validation");
var nakedSlice = require("../api/etc/nakedSlice");
//testing object:
var sliceFlag = true;
var sliceID = 0;
var MaxInt = 4294967295;
var number = 1;
var algoReady = false;
var algos = [];

function getAlgoReadyVal(){
  return algoReady;
};

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  };

  function getNewSlice(){
    var newSlice = new nakedSlice(100);
    newSlice.id = sliceID++;
    newSlice.buffer = new Uint32Array(16);
    for(var i = 0; i < 16 ; i++){
    if (number <= MaxInt){
          newSlice.buffer[i]=number;
            number++;
       }
       else{
          sliceFlag=false;
       }
     }
    console.log("NEW SLICE ID: " +newSlice.id + "\n\n");
    return newSlice;
};

  function storeResultSlice(data){
    var resultSlice = new nakedSlice(100);
    resultSlice.id = data.id;
    resultSlice.buffer = data.buffer;
    /*
    TO DO:
    add functionalty to deliver result slice to assembler
    */
  };

 
  function sliceAvailable(){
    /*
    TO DO:
    add functionalty to check for available slice
    */
    if (sliceFlag){
      return true;
    }
    else {
      return false;
    }
  };

  var server = http.createServer(onRequest);
  server.listen(8000);

  var io = require('socket.io').listen(server);
  
  var sliceZero = new nakedSlice(100);
  sliceZero.id = 1;
  for(var i = 0; i < 100 ; i++){
    sliceZero.buffer[i]=i*2;
  };

  console.log("Server has started.");
  
  io.sockets.on('connection', function(socket) {
    //Emit connection event
    socket.emit('server2client', {data: 'test'});
    
    //incoming event handling:
    socket.on('getsliceZero', function() {
      socket.emit('sliceZero', sliceZero);
      console.log("Sent Slice Zero");
    });
    
    socket.on('sliceZeroProcessed', function() {
      socket.emit('nakedSlice', getNewSlice());
      console.log("Sent new NakedSlice");
    });
    
    socket.on('resultSlice', function(data) {
      console.log("Recived new ResultSlice");
      console.log(data);
      storeResultSlice(data);
      if (sliceAvailable()){
        socket.emit('nakedSlice', getNewSlice());
      }
      else{
        socket.emit('noSliceAvailable',{});
      }
    });
    
    socket.on('slice2client', function(){
      console.log("sending slice to client");
      socket.emit('slice',testSlice);
    });
    
    socket.on('adminConnected', function(){
      console.log('admin connected');
      socket.emit('server2admin', { algos: algos,
                                    flag: algoReady });
    });

    socket.on('startAlgo', function(){
      console.log('start Algo');
      algoReady = true;
    });

    socket.on('stopAlgo', function(){
      console.log('stop Algo');
      algoReady = false;
    });
    
    socket.on('upload', function(file){
      if (algos.length > 0){
        socket.emit('uploadSuccess', algos[algos.length]);
      }else{
        //toDo: insert validation, figure out how to do this properly
        algos[algos.length] = file;
        setTimeout(function() {
        if (validator.validateZippedAlgo() !== false)
          socket.emit('uploadSuccess', file);
        else
          socket.emit('uploadFail', {});
        }, 5000);
      }
    });
  });

}

exports.start = start;
exports.getAlgoReadyVal = getAlgoReadyVal;