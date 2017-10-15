let scrypt = require('scrypt');

const maxtime = 0.1; // a decimal (double) representing the maximum amount of time in seconds scrypt will spend when computing the derived key.
const maxmem = 0; //   an integer, specifying the maximum number of bytes of RAM used when computing the derived encryption key. If not present, will default to 0.
const maxmemfrac = 0.5;
// function callback_function (data) {}. // not for sync

let scryptParameters = scrypt.paramsSync(maxtime);

function encode(s) {
  console.time('encode');

  let enc = scrypt.kdfSync(s, scryptParameters).toString('Base64');

  console.timeEnd('encode');

  return enc;
}


function verify(encoded, s) {
  
  console.time('verfiy');

  let vef = scrypt.verifyKdfSync(new Buffer(encoded, 'Base64'), s)

  console.timeEnd('verfiy');

  return vef;
}

// Example:
let s = encode('my password');  // c2NyeXB0AAwAAAAI....
console.log('Encrypted: ', s);

verify(s, 'my password') && console.log('Successfully verified !!');
verify(s, 'my pa$$word') || console.log('Failed to verify :( ');
