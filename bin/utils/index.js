const readline = require("readline");

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

module.exports = {
  askQuestion,
};
