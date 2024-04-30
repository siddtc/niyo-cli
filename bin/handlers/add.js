const { askQuestion, runCommand, validateOption, addEmptyLines } = require("../utils");
const { addQuestions, commonQuestions, mongoQuestions } = require("../common");
const { frameworks, SERVICES } = require("../config");
const location = process.cwd();
const serviceName = location.split("/")[-1];


let service = null;
let framework = null;

const kafkaProducerAdder = async () => {

}

const kafkaConsumerAdder = async () => {

}

const addMongo = async (framework) => {

    let branchName = null;

    console.log("--------Please answer the following questions for UAT environment.--------\n")
    const uatOrganisation = await askQuestion(mongoQuestions.organisation);
    let uatProject = await askQuestion(mongoQuestions.project);
    let uatCluster = await askQuestion(mongoQuestions.cluster);
    let uatDb = await askQuestion(mongoQuestions.db);
    
    addEmptyLines(1)
    console.log("--------Please answer the following questions for PROD environment.--------\n")
    let prodOrganisation = await askQuestion(mongoQuestions.organisation);
    let prodProject = await askQuestion(mongoQuestions.project);
    let prodCluster = await askQuestion(mongoQuestions.cluster);
    let prodDb = await askQuestion(mongoQuestions.db);




    switch (framework) {
        case "1":
            branchName = "nestjs-mongo";
            break;
        case "2":
            branchName = "go-mongo";
            break;
    }

    await runCommand(`cd ${location}/${serviceName} && git fetch boilerplate ${branchName}`)
    await runCommand(`cd ${location}/${serviceName} && git merge boilerplate/${branchName}`)

    // await handleMergeConflicts()



}

const addKafka = async (framework) => {

}

const addRedis = async (framework) => {
    let branchName = null;
    switch (framework) {
        case "1":
            branchName = "nestjs-redis";
            break;
        case "2":
            branchName = "go-redis";
            break;
    }

    await runCommand(`cd ${location}/${serviceName} && git fetch boilerplate ${branchName}`)
    await runCommand(`cd ${location}/${serviceName} && git merge boilerplate/${branchName}`)
    // await handleMergeConflicts()
    console.log("Redis service has been added..");

}

const addService = async () => {
    framework = await askQuestion(commonQuestions.framework);
    validateOption(framework, frameworks.length)
    addEmptyLines();

    service = await askQuestion(addQuestions.selectService);
    validateOption(service, SERVICES.length)
    addEmptyLines();

    switch (service) {
        case "1":
            await addMongo(framework);
            break;
        case "2":
            await addKafka(framework);
            break;
        case "3":
            await addRedis(framework);
            break;
        default:
            console.error("Something is off with the code.")
            break;
    }

    process.exit(1);



}



module.exports = { addService }