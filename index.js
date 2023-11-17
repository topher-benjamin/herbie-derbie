
const processFile = require("./processFile");


// Allow command-line usage
if (require.main === module) {
  const fileName = process.argv[2];
  if (!fileName) {
    console.log('Please provide a file name. Usage: node index.js input.txt');
    process.exit(1);
  }
  processFile(fileName)
    .then(() => console.log('File has been processed'))
    .catch(error => console.error('Error processing file:', error));
}


