const { askQuestion, runCommand } = require("../utils");
const { addQuestions } = require("../common");
const { awsAccounts, frameworks } = require("../config");
const { buildProject } = require("../repo-builder")
const location = process.cwd();

let service = null;
let application = null


const kafkaProducerAdder = async ()=>{

}

const kafkaConsumerAdder = async ()=>{

}
const addService = async (service)=>{
    const applications = await runCommand("ls")
    application = await askQuestion(addQuestions.selectService)


}



module.exports = { addService }