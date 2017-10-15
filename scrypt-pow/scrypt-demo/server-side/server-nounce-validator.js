const scrypt = require('scrypt');
const Buffer = require('buffer').Buffer;

const maxtime =  0.1; // a decimal (double) representing the maximum amount of time in seconds scrypt will spend when computing the derived key.
const maxmem = 0; //   an integer, specifying the maximum number of bytes of RAM used when computing the derived encryption key. If not present, will default to 0.
const maxmemfrac = 0.5;

const nounce = '6f9f8e7d-1385-4a97-a4f3-2f0ec9f96bbb';
const clientHash = 'c2NyeXB0AAEAAAAIAAAAAdmKrKRHt6uDuI96+CRKgm6NxrJrh6P61HL+R2/KyLH+gp662i4Rh1oeRU+oVvlCeaYPak94BdtbKdwH5UynoQLfTUfhXIxiSKg7XeU9mYCR';

const hash = Buffer.hasOwnProperty('from') ? Buffer.from(clientHash, 'base64') : new Buffer(clientHash, 'base64');
const debug = true;

scrypt.params(maxtime).then((params) => {
    console.log('Pre-configured setting: ', params);
    return params;
}).then((params) => {
    debug && console.time('verifyKdf');
    return scrypt.verifyKdf(hash, nounce, params);
}).then((result) => {
    debug && console.timeEnd('verifyKdf');
    result ? console.log('Success') : console.log("Invalid Nonce");
}).catch((err)  => {
    console.log('Error ', err);
});

