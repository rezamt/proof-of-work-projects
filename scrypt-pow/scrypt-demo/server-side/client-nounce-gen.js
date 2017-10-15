let scrypt = require('scrypt');

const maxtime = 0.1; // a decimal (double) representing the maximum amount of time in seconds scrypt will spend when computing the derived key.
const maxmem = 0; //   an integer, specifying the maximum number of bytes of RAM used when computing the derived encryption key. If not present, will default to 0.
const maxmemfrac = 0.5;

const nounce = '6f9f8e7d-1385-4a97-a4f3-2f0ec9f96bbb';
const debug = true;

const cparams = {N: 1, r: 8, p: 1};

scrypt.params(maxtime).then(function (params) {
    console.log('Pre-configured setting: ', params);
    return params;
}).then((params) => {
    debug && console.time('kdf');
    return scrypt.kdf(nounce, cparams);
}).then((result) => {
    debug && console.timeEnd('kdf');
    console.log('Hashed Nounce: ', result.toString("base64"));
}).catch(err => {
    console.log('Error : ', err);
});


