const { askQuestion, runCommand } = require("../utils");
const { createQuestions, commonQuestions } = require("../common");
const { awsAccounts, frameworks } = require("../config");
const { buildProject } = require("../repo-builder")
const location = process.cwd();
let serviceName = null;

const addApplicationName = async () => {
  await runCommand(`cd ${location}/${serviceName} && find . -type f -exec sed -i 's/$ServiceName/${serviceName}/g' {} +`)
}

const addNamespace = async (namespace) => {
  await runCommand(`cd ${location}/${serviceName} && find . -type f -exec sed -i 's/$Namespace/${namespace}/g' {} +`)
}

let awsAccount = null;
let namespace = null;
let clusterName = null;
let framework = null;

const createService = async (sn) => {
  serviceName = sn;
  awsAccount = await askQuestion(createQuestions.awsAccount);
  clusterName = await askQuestion(createQuestions.clusterName);
  namespace = await askQuestion(createQuestions.namespace);
  framework = await askQuestion(commonQuestions.framework);

  console.log("\n Please confirm the following details :- \n");
  console.log("Service Name =>", serviceName);
  console.log("Aws Account =>", awsAccounts[awsAccount - 1]);
  console.log("Cluster Name =>", clusterName);
  console.log("Namespace =>", namespace);
  console.log("Framework =>", frameworks[framework - 1], "\n\n");

  let yn = await askQuestion(commonQuestions.yn);

  if (
    yn == "n" ||
    awsAccount >= awsAccounts.length ||
    framework >= frameworks.length
  ) {
    console.log("\n\nNo worries, you can always try again.\n\n");

    if (awsAccount > awsAccounts.length)
      console.log(
        "Also please enter a valid aws Account Number, currently you entered",
        awsAccount,
        "\n\n"
      );

    if (framework > frameworks.length)
      console.log(
        "Also please enter a valid Framework, currently you entered",
        framework,
        "\n\n"
      );

    createService(serviceName);
  }

  await buildProject(serviceName, framework);
  await addApplicationName();
  await addNamespace(namespace);
  console.log("Your Repository has been created.")
  process.exit(1)
};

module.exports = {
  createService,
};
