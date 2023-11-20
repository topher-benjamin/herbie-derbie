import fs from "fs";
import readline from "readline";
import neo4j from "neo4j-driver";
import { createCompany, viewAllNodes } from "./neo4jOperations.js";

const URI = "neo4j+s://1f8327e8.databases.neo4j.io";
const USER = "neo4j";
const PASSWORD = "CdkT6VN4K0v8CwSe1XXJ_18WyuRUVktsWAjAW09OmWw";
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
const session = driver.session();

async function processLine(line) {
  // Split the line into parts and process based on the command type
  const parts = line.split(' ');
  const command = parts[0];

  switch (command) {
    case "Partner":
      console.log("partner", line);
      break;
    case "Company":
      console.log("company", line);
      await createCompany(parts[1], session);
      break;
    case "Employee":
      console.log("employee", line);
      break;
    case "Contact":
      console.log("contact", line);
      break;
    default:
      console.error(`Invalid command: ${parts[0]}`);
      process.exit(1);
  }
}


export async function processFile(fileName) {
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      await processLine(line, session);
    }

}

// function to analyze the network
export const analyzeNetwork = async () => {
  console.log("Analyzing the network");
  
  return viewAllNodes(session);
  // a dummy implementation
  // return [
  //   "ACME: No current relationship",
  //   "Globex: Chris (2)",
  //   "Hooli: Molly (1)",
  // ];
};

// main method which will orchestrate the various functions
export const main = async () => {
  const fileName = process.argv[2];

  await processFile(fileName);

  const results = await analyzeNetwork();

  // output results to console
  console.log('results', results);


  // close the session
  await session.close();
  // close the driver
  await driver.close();
};

main();
