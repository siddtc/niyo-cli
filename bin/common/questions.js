#! /usr/bin/env node

const { awsAccounts, frameworks, SERVICES, mongo } = require("../config");

const createQuestions = {
  awsAccount: `Which AWS account you will be using for prod deployment. \n ${awsAccounts
    .map((i, j) => j + 1 + ". " + i)
    .join("\n ")} \n\n Please enter the number. \n\n`,
  clusterName:
    "Please provide the name of the cluster to which the service will be deployed. \n",
  namespace: `Please provide the name of the namespace \n`,

};

const commonQuestions = {
  framework: `Choose your framework \n ${frameworks.map((i, j) => j + 1 + ". " + i).join("\n ")} \n\n Please enter the number. \n\n`,
  yn: 'yes or no (y  or n)'
}

const addQuestions = {
  selectService: `Choose the service which you want to add. \n ${SERVICES
    .map((i, j) => j + 1 + ". " + i)
    .join("\n ")} \n\n Please enter the number. \n\n`
}

const mongoQuestions = {
  organisation: `Choose the mongo organisation in which db is present or needs to be created. \n ${mongo.organisations
    .map((i, j) => j + 1 + ". " + i)
    .join("\n ")} \n\n Please enter the number, press 0 if a new organisation needs to be created \t`,

  project: `Please enter the mongo project in which db is present or needs to be created. press 0 if a new project needs to be created\t`,
  cluster: 'Please enter the mongo cluster in which db is present or needs to be created, press 0 if a new cluster needs to be created\t',
  db: 'Please enter the name of the database \t',

}
const kafkaQuestions = {}
const redisQuestions = {}

module.exports = {
  createQuestions,
  addQuestions,
  commonQuestions,
  mongoQuestions,
  kafkaQuestions,
  redisQuestions,
};
