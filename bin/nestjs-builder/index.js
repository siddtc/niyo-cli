#! /usr/bin/env node
const { exec } = require("child_process");
const { repoURL } = require("../config")

const runCommand = async (command) => {
  return new Promise((res) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log("Something went wrong while running the command.\n", command);
      } else {
        console.log(stdout);
      }
    });
    resolve(true);
  });
};

const createFolder = async (folderName, location) => {
  await runCommand(`cd ${location} && mkdir ${folderName}`);
};

const addGit = async (folderName, location) => {
  await runCommand(`cd ${folderName}/${location} && git init`)
  await runCommand(`cd ${folderName}/${location} && git remote add boilerplate ${repoURL}`)
  await runCommand(`cd ${folderName}/${location} && git fetch boilerplate nestjs`)
  await runCommand(`cd ${folderName}/${location} && git merge boilerplate/nestjs`)
  console.log("Base code generated successfully..")
}

const addServiceName = async () => {

}

const buildNestJs = async (serviceName) => {
  const cwd = process.cwd()
  await createFolder(serviceName, cwd);
  await addGit(serviceName, cwd);
  await addServiceName()
};

module.exports = {
  buildNestJs,
};
