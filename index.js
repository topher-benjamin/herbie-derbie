
const fs = require('fs');
const readline = require('readline');

const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a file name. \nUsage: node index.js <file name>');
  process.exit(1);
}

const fileStream = fs.createReadStream(fileName);

const r1 = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

const allowedCommands = ['Partner', 'Company', 'Employee', 'Contact'];

r1.on('line', (line) => {
  console.log(`Line from file: ${line}`);
  const parts = line.split(' ');
  console.log(parts);
  
  if (!allowedCommands.includes(parts[0])) {
    console.error(`Invalid command: ${parts[0]}`);
    process.exit(1);
  }
});


r1.on('close', () => {
  console.log('Finished reading file');
});
