const fs = require("fs");
const readline = require("readline");
const { Partner, Company, Employee, Contact } = require('./entities');


const allowedCommands = ["Partner", "Company", "Employee", "Contact"];

async function processFile(fileName) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(fileName);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      console.log(`Line from file: ${line}`);
      const parts = line.split(" ");
    //   console.log(parts);

      if (!allowedCommands.includes(parts[0])) {
        console.error(`Invalid command: ${parts[0]}`);
        process.exit(1);
      }
      
      switch (parts[0]) {
        case "Partner":
          const partner = new Partner(parts[1]);
          console.log(partner);
          break;
        case "Company":
          const company = new Company(parts[1]);
          console.log(company);
          break;
        case "Employee":
          const employee = new Employee(parts[1], parts[2]);
          console.log(employee);
          break;
        case "Contact":
          const contact = new Contact(parts[1], parts[2], parts[3]);
          console.log(contact);
          break;
        default:
          console.error(`Invalid command: ${parts[0]}`);
          process.exit(1);
      }
    });

    rl.on("close", () => {
      console.log("Finished reading file");
      resolve();
    });

    rl.on("error", (error) => {
      console.error("Error reading file:", error);
      reject();
    });
  });
}

module.exports = processFile;