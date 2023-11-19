import fs from "fs";
import readline from "readline";

async function processFile(fileName) {
  const partners = [];
  const companies = [];
  const employees = [];
  const contacts = [];

  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      // could add line validation here

      const parts = line.split(" ");
      
      switch (parts[0]) {
        case "Partner":
          console.log('partner', line);
          partners.push(parts[1]);
          break;
        case "Company":
          console.log('company', line);
          break;
        case "Employee":
          console.log('employee', line);
          break;
        case "Contact":
          console.log('contact', line);
          break;
        default:
          console.error(`Invalid command: ${parts[0]}`);
          process.exit(1);
      }
    });
    rl.on("close", () => {
      console.log("Finished reading file");
      resolve(partners);
    });
  });
}

// function to analyze the network
const analyzeNetwork = async (data) => {
  console.log("Analyzing the network");
  // a dummy implementation
  return [
    "ACME: No current relationship",
    "Globex: Chris (2)",
    "Hooli: Molly (1)",
  ]
};

// main method which will orchestrate the various functions
const main = async () => {
  const fileName = process.argv[2];

  const data = await processFile(fileName);

  const results = await analyzeNetwork(data);

  // output results to console
  console.log(results.join('\n'));
};

main();
