const commander = require("commander");
const start = require("../commands/start");

const program = new commander.Command();

program
  .command("start")
  .alias("s")
  .option("--server-only", "Do not open dashboard, start server only")
  .description("start crudify server and open dashboard")
  .action(start);

program.parseAsync(process.agrv);
