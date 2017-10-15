let scrypt = require('scrypt');

const maxtime = 4; // a decimal (double) representing the maximum amount of time in seconds scrypt will spend when computing the derived key.
const maxmem = 0; //   an integer, specifying the maximum number of bytes of RAM used when computing the derived encryption key. If not present, will default to 0.
const maxmemfrac = 0.5;

const nounce = '6f9f8e7d-1385-4a97-a4f3-2f0ec9f96bbb';
const debug = true;

scrypt.params(maxtime).then((params) => {
  console.log('Pre-configured setting: ', params);
  return params;
}).then((params) => {
   debug && console.time('kdf');
   return scrypt.kdf(nounce, params);   
}).then( (result) => {
	debug && console.timeEnd('kdf');
	console.log('Hashed Nounce: ', result.toString("base64"));
	return result;
}).then((hash) => {
   debug && console.time('verifyKdf');
   return scrypt.verifyKdf(hash, nounce); 
}).then((result) => {
   debug && console.timeEnd('verifyKdf');
   result ? console.log('Success') : console.log("Invalid Nonce");
});


