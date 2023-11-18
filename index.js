import { inputData } from "./inputData.js";

// main method which will orchestrate the various functions
const main = () => {
  console.log("Starting the application");

  // get the data from the file
  const textData = retrieveDataFromFile().validate();

  // ingest data from file and input into a graph data structure
  inputData(textData);

  // analyze data and output results
  // analyzeData();
};

main();
