
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

r1.on('line', (line) => {
  console.log(`Line from file: ${line}`);
});


r1.on('close', () => {
  console.log('Finished reading file');
});
