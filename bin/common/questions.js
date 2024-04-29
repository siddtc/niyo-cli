#! /usr/bin/env node

const { awsAccounts, frameworks } = require("../config");

const createQuestions = {
  awsAccount: `Which AWS account you will be using for prod deployment. \n ${awsAccounts
    .map((i, j) => j + 1 + ". " + i)
    .join("\n ")} \n`,
  clusterName:
    "Please provide the name of the cluster to which the service will be deployed. \n",
  namespace: `Please provide the name of the namespace \n`,
  framework:`Which framework you'll be choosing for this service? Please provide the number. \n ${frameworks.map((i,j)=> j + 1 + ". " + i).join("\n ")} \n`,
  yn:'yes or no (y  or n)' 
};

module.exports = {
  createQuestions,
};
