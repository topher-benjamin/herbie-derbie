import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import readline from "readline";
import neo4j from "neo4j-driver";
import { analyze, createCompany, createContact, createEmployee, createPartner, nukeDb } from "./neo4jOperations.js";

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USER;
const PASSWORD = process.env.NEO4J_PASSWORD;
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
const session = driver.session();

async function processLine(line) {
  // Split the line into parts and process based on the command type
  const parts = line.split(' ');
  const command = parts[0];

  switch (command) {
    case "Partner":
      await createPartner(parts[1], session);
      break;
    case "Company":
      await createCompany(parts[1], session);
      break;
    case "Employee":
      await createEmployee(parts[1], parts[2], session);
      break;
    case "Contact":
      await createContact(parts[1], parts[2], parts[3], session);
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

// function to display the results
export const displayResults = (results) => {
  console.log('results', results.join('\n') );
};

// function to analyze the network
export const analyzeNetwork = async () => {
  return await analyze(session);
};

// main method which will orchestrate the various functions
export const main = async () => {
  const fileName = process.argv[2];

  await processFile(fileName);

  const results = await analyzeNetwork();

  // output results to console

  displayResults(results);

  // cleanup db
  await nukeDb(session);
  // close the driver
  await driver.close();
};

main();
