const pow = require('proof-of-work');

const verifier = new pow.Verifier({
    // bit-size of Bloom filter
    size: 1024,

    // number of hash functions in a Bloom filter
    n: 16,

    // target complexity
    complexity: 19,

    // **recommended, but optional** nonce prefix
    // It is highly suggested to use unique nonce prefix for your application
    // to avoid nonce-reuse attack
    prefix: Buffer.from('abcd', 'hex'),

    // nonce validity time (default: one minute)
    validity: 60000
});

// Remove stale nonces from Bloom filter
setInterval(() => {
    verifier.reset();
}, 60000);




const solver = new pow.Solver();

// complexity=13 prefix=abcd
const prefix = Buffer.from('abcd', 'hex');

const nonce = solver.solve(10, /* optional */ prefix);

console.log('Validate the nonce ');
verifier.check(nonce, 10);