/**

scrypt(key, salt, N, r, p, keyLenBytes, [progressCallback])
	- key: The key. Either Buffer or string.
	- salt: The salt. Either Buffer or string.
	- N: The number of iterations. number (integer)
	- r: Memory factor. number (integer)
	- p: Parallelization factor. number (integer)
	- keyLenBytes: The number of bytes to return. number (integer)
	- progressCallback: Call callback on every 1000 ops. Passes in {current, total, percent} as first parameter to progressCallback().

Returns Buffer.


*/


var scrypt = require('scryptsy')
 
var key = "pleaseletmein"
var salt = "SodiumChloride"
var N = 16384;
var r = 8;
var p = 4;
var dkLen = 64;


function progressCallback(data) {
	console.log('progress: current: '+ data.current + '  total: '+ data.total + ' percent: ' + data.percent + '%' );
}

// N = Cpu cost, r = Memory cost, p = parallelization cost
// (key, salt, N, r, p, dkLen, progressCallback)
var data = scrypt(key, salt, N, r, p, dkLen, progressCallback);

console.log(data.toString('hex'))
