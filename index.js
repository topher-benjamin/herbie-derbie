import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import readline from "readline";
import { validateLine } from "./fileOperations.js";
import { analyzeNetwork, connectToDb, closeDbConnection, createCompany, createContact, createEmployee, createPartner} from "./neo4jOperations.js";


async function processLine(line) {
  const parts = line.split(' ');
  const command = parts[0];

  validateLine(parts);

  switch (command) {
    case 'Partner':
      await createPartner(parts[1]);
      break;
    case 'Company':
      await createCompany(parts[1]);
      break;
    case 'Employee':
      await createEmployee(parts[1], parts[2]);
      break;
    case 'Contact':
      await createContact(parts[1], parts[2], parts[3]);
      break;
    default:
      console.error(`Invalid command: ${parts[0]}`);
      process.exit(1);
  }
}

export async function processFile() {
    let rl;

    if (process.argv.length > 2){
      const fileName = process.argv[2];
      const fileStream = fs.createReadStream(fileName);
      rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
    } else {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      })
    }

    // WARNING: potential memory leak if file is too large. Promises be like that.
    for await (const line of rl) {
      await processLine(line);
    }
}

export function displayResults(results) {
  const output = results.map((record) => {
    const companyName = record.get("CompanyName");
    const partnerName = record.get("PartnerName");
    const relationshipStrength = record.get("RelationshipStrength");

    // Format the output for each company
    if (partnerName && relationshipStrength > 0) {
      return `${companyName}: ${partnerName} (${relationshipStrength})`;
    } else {
      return `${companyName}: No current relationship`;
    }
  });

  console.log(output.join("\n"));
}

export const main = async () => {
  await connectToDb();

  await processFile();

  displayResults(await analyzeNetwork());

  closeDbConnection();
};

main();
