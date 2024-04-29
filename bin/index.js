#! /usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const figlet = require("figlet");
const handlers = require("./handlers");


program
  .name("niyo-cli")
  .version("1.0.0")
  .description("Niyo's own cli which makes setting up new projects easier.");

figlet("Welcome to niyo-cli", (err, data) => {
  console.log(data);
  console.log("\n\n\n");
}).then(() => {
  program
    .command("create")
    .description("Set up a new project from scratch.")
    .requiredOption("-s --service-name <name of the service>")
    .action(async (opt) => {
      handlers.createService(opt.serviceName);
    });

  program
    .command("add")
    .description("Add Kafka, MongoDb, Redis support to your current repo.")
    .option("-s --service", "Name of the service which needs to be integrated (Kafka, MongoDb, Redis)")
    .action(async (cmd) => {handlers.addService(cmd.serviceName)});

  program.parse();
});
