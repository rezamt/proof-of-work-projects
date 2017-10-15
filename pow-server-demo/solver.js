const pow = require('proof-of-work');

const solver = new pow.Solver();

// complexity=13 prefix=abcd
const prefix = Buffer.from('abcd', 'hex');

const nonce = solver.solve(13, /* optional */ prefix);

console.log(nonce);