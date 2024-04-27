#! /usr/bin/env node
const { exec } = require("child_process");
const {repoURL} = require("../config")

const runCommand = async (command) => {
  return new Promise((res) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log("Something went wrong while running the command.\n", command);
        return;
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

const addGit = async(folderName, location)=>{
  await runCommand(`cd ${folderName}/${location} && git init`)
  await runCommand(`cd ${folderName}/${location} && git remote add boilerplate ${repoURL}`)
  await runCommand(`cd ${folderName}/${location} && git pull boilerplate nestjs`)
  console.log("GIT REMOTE ADDED SUCCESSFULLY")
}

const buildNestJs = async (serviceName) => {
  const cwd = process.cwd()
  await createFolder(serviceName, cwd);
  await addGit(serviceName,cwd)
};

module.exports = {
  buildNestJs,
};
