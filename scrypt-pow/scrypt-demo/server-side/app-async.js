let scrypt = require('scrypt');

const maxtime = 4; // a decimal (double) representing the maximum amount of time in seconds scrypt will spend when computing the derived key.
const maxmem = 0; //   an integer, specifying the maximum number of bytes of RAM used when computing the derived encryption key. If not present, will default to 0.
const maxmemfrac = 0.5;

var params = {};

let scryptParameters = scrypt.params(maxtime, maxmem, maxmemfrac,  
	function(err, scryptParameters) {
		console.log(scryptParameters);
		params = scryptParameters;
});

const nounce = 'test';

console.time('kdf');
scrypt.kdf(nounce, { N: 20, r: 8, p: 1 }).then(function(result){
  const hash = result.toString("base64");
  console.log('Hashed Nounce: ', hash);
  console.timeEnd('kdf');

  console.time('verifyKdf');
  scrypt.verifyKdf(result, nounce).then(function(result) {
  	   console.timeEnd('verifyKdf');
	   result && console.log('successful');  		
	}, function(err) {
		console.log('verifyKdf caused error: ', err);
	});

}, function(err){
	console.log('kdf caused error: ', err);
});

