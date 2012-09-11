var algorithm = function (){
	var that = {};
	that.sliceZero = null;
	// Will be called to run algorithm on slice.
	// slice confirmes to the nakedslice interface.
	// call resultCB when done.
	that.procceSlice = function (slice){
		var resultSlice = new nakedSlice(100);
		resultSlice.buffer = new Uint32Array(16);
		resultSlice.buffer = slice.buffer;	
		for (var i = 0; i<=100; i++){
			if (isPrime(slice.buffer[i])){
				that.AlgoMessageBox.logMsg("FOUND PRIME: "+resultSlice.buffer[i]);
			}
			else{
				resultSlice[i]=0;
			}
		}
		that.AlgoMessageBox.resultCB(resultSlice);
	};

	//objects which linkes to system.
	//confirms to the AlgoMessageBox interface.
	that.AlgoMessageBox = null;
	
	// handdle slice Zero and perform init
	// call slice zeroCB
	that.recieveSliceZero = function(sliceZero){
		that.sliceZero = sliceZero;
		that.AlgoMessageBox.zeroCB();
	};

	isPrime = function(n) {
		 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
		 if (n==leastFactor(n)) return true;
		 return false;
	}

	// leastFactor(n)
	// returns the smallest prime that divides n
	//     NaN if n is NaN or Infinity
	//      0  if n=0
	//      1  if n=1, n=-1, or n is not an integer

	leastFactor = function(n){
		 if (isNaN(n) || !isFinite(n)) return NaN;  
		 if (n==0) return 0;  
		 if (n%1 || n*n<2) return 1;
		 if (n%2==0) return 2;  
		 if (n%3==0) return 3;  
		 if (n%5==0) return 5;  
		 var m = Math.sqrt(n);
		 for (var i=7;i<=m;i+=30) {
		  if ((n%i)==0)	   return i;
		  if (n%(i+4)==0)  return i+4;
		  if (n%(i+6)==0)  return i+6;
		  if (n%(i+10)==0) return i+10;
		  if (n%(i+12)==0) return i+12;
		  if (n%(i+16)==0) return i+16;
		  if (n%(i+22)==0) return i+22;
		  if (n%(i+24)==0) return i+24;
	 }
	 return n;
	}

	return that;
};

module.exports = algorithm;