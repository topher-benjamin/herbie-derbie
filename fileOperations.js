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

  // Validate that Contacts have only valid contact types
  if (command === 'Contact' && !VALID_CONTACT_TYPES.includes(parts[3])) {
    console.error(`Invalid contact type: ${parts[3]}`);
    process.exit(1);
  }
}
