#! /usr/bin/env node

const { repoURL } = require("../config")
const { runCommand } = require("../utils");

const createFolder = async (location, folderName) => {
  await runCommand(`cd ${location} && mkdir ${folderName}`);
};

const addGit = async (location, folderName) => {
  await runCommand(`cd ${location}/${folderName} && git init`)
  await runCommand(`cd ${location}/${folderName} && git remote add boilerplate ${repoURL}`)
  console.log("Git repo added successfully..")
}

const addNestJs = async (location, folderName) => {
  await runCommand(`cd ${location}/${folderName} && git fetch boilerplate nest`)
  await runCommand(`cd ${location}/${folderName} && git merge boilerplate/nest`)
  console.log("Added base code successfully..")
}

const addGin = async (location, folderName) => {
  await runCommand(`cd ${location}/${folderName} && git fetch boilerplate go`)
  await runCommand(`cd ${location}/${folderName} && git merge boilerplate/go`)
  console.log("Added Gin(Go) base code successfully..")
}



const buildProject = async (serviceName, framework) => {
  const cwd = process.cwd()
  await createFolder(cwd, serviceName);
  await addGit(cwd, serviceName);

  if (framework == "1") {
    await addNestJs(cwd, serviceName)
  }
  if (framework == "2") {
    await addGin(cwd, serviceName)
  }
};

module.exports = {
  buildProject,
};
