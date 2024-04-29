const { askQuestion, runCommand, validateOption, addEmptyLines } = require("../utils");
const { addQuestions, commonQuestions } = require("../common");
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
    await runCommand(`git status -s | grep '^UU' | awk '{print $2}' | xargs git checkout --ours --`)
    await run

}

const addKafka = async (framework) => {

}

const addRedis = async (framework) => {

}

const addService = async () => {
    framework = await askQuestion(commonQuestions.framework);
    validateOption(framework, frameworks.length)
    addEmptyLines();

    service = await askQuestion(addQuestions.selectService);
    validateOption(service, SERVICES.length)
    addEmptyLines();

    switch (service) {
        case SERVICES[0]:
            await addMongo(framework);
            break;
        case SERVICES[1]:
            await addKafka(framework);
            break;
        case SERVICES[2]:
            await addRedis(framework);
            break;
    }



}



module.exports = { addService }