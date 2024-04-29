const readline = require("readline");
const { exec } = require("child_process");

// Function to create a readline interface
const createReadlineInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

const askQuestion = async (question) => {
  return new Promise((resolve, reject) => {
    const rl = createReadlineInterface();
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const runCommand = async (command) => {
  return new Promise((res) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log("Something went wrong while running the command.\n", command);
        console.error(err);
        process.exit(1);
      } else {
        console.log(stdout);
      }
    });
    resolve(true);
  });
};

module.exports = {
  askQuestion,
  runCommand
};
