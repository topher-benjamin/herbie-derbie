import { createCompany, createContact, createEmployee, createPartner } from "./neo4jOperations.js";

const VALID_COMMANDS = ["Partner", "Company", "Employee", "Contact"];
const VALID_CONTACT_TYPES = ["email", "call", "coffee"]; 

export function validateLine(parts) {
  // Validate that the line is not empty
  if (!parts.length) {
    console.error("Line is empty");
    process.exit(1);
  }
  // Validate that the line starts with one of the valid commands
  const command = parts[0];
  
  if (!VALID_COMMANDS.includes(command)) {
    console.error(`Invalid command: ${command}`);
    process.exit(1);
  }

  if (command === 'Contact' && !VALID_CONTACT_TYPES.includes(parts[3])) {
    console.error(`Invalid contact type: ${parts[3]}`);
    process.exit(1);
  }
}

export async function processLine(line) {
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
    // Could refactor here to add suport for STDIN
    const fileName = process.argv[2];
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    // WARNING: potential memory leak if file is too large. Promises be like that.
    for await (const line of rl) {
      await processLine(line);
    }

}