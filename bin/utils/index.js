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
        console.log(stdout, stderr);
        res(true);
      }
    })
  });
};

const validateOption = (input, length) => {
  if (input < 0 || input > length) {
    console.log(
      "Please enter a valid number, currently you entered",
      input,
      "\n\n"
    );
    process.exit(1);
  }
  return true;
}

const addEmptyLines = (lines = 1) => {
  for (let i = 0; i < lines; i++) {
    console.log("\n");
  }
}

module.exports = {
  askQuestion,
  runCommand,
  validateOption,
  addEmptyLines
};
