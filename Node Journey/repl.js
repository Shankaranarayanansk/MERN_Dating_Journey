const repl = require("repl");
const local = repl . start();
local.on("exit",() =>
    {
      console.log("repl ends");
      process.exit(0);
    })