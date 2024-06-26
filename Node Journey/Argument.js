const minimist = require ("minimist")

const argNew = minimist(process.argv.slice(2)[0]);

console.log(argNew.name);