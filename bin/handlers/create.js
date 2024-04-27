const { askQuestion } = require("../utils");
const { createQuestions } = require("../common");
const { awsAccounts, frameworks } = require("../config");
const {buildNestJs} = require("../nestjs-builder")

let serviceName = null;
let awsAccount = null;
let namespace = null;
let clusterName = null;
let framework = null;

// Function to create a readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const createService = async (sn) => {
  serviceName = sn;
  awsAccount = await askQuestion(createQuestions.awsAccount);
  clusterName = await askQuestion(createQuestions.clusterName);
  namespace = await askQuestion(createQuestions.namespace);
  framework = await askQuestion(createQuestions.framework);

  console.log("\n Please confirm the following details :- \n");
  console.log("Service Name =>", serviceName);
  console.log("Aws Account =>", awsAccounts[awsAccount - 1]);
  console.log("Cluster Name =>", clusterName);
  console.log("Namespace =>", namespace);
  console.log("Framework =>", frameworks[framework - 1], "\n\n");

  let yn = await askQuestion(createQuestions.yn);

  if (
    yn == "n" ||
    awsAccount >= awsAccounts.length ||
    framework >= frameworks.length
  ) {
    console.log("\n\nNo worries, you can always try again.\n\n");

    if (awsAccount >= awsAccounts.length)
      console.log(
        "Also please enter a valid aws Account Number, currently you entered",
        awsAccount,
        "\n\n"
      );

    if (framework >= frameworks.length)
      console.log(
        "Also please enter a valid Framework, currently you entered",
        framework,
        "\n\n"
      );

    createService();
  }

  switch (framework) {
    case "1":
      await buildNestJs({
        serviceName,
      });
    //   mailCreator.sendCreateDetailsMail()
      break;
    case "2":
        // buildGin({
        //     serviceName,

        // })
      break;
  }
};

module.exports = {
  createService,
};
