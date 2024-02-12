// Command-line tool to create new text using Markov chains.
/*
 * Usage: node markov-text-generator.js <method> <path/url>
 *
 * Methods:
 * - file: Generates text from a local file.
 * - url:  Generates text from a web page.
 */

// Import necessary modules
const fs = require("fs"); // Reading files
const markov = require("./markov"); // Custom Markov chain generator
const axios = require("axios"); // fetching text from URLs
const process = require("process"); // To access command-line arguments

//Generates text from the provided input text using Markov chains.
 
function generateText(text) {
  // Create a new MarkovMachine instance with the input text
  let mm = new markov.MarkovMachine(text);

  // Generate and print the new text
  console.log(mm.makeText());
}

//Reads text from a file and generates new text using Markov chains.

function makeText(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${path}`, err);
      process.exit(1); // Exit due to error
    } else {
      generateText(data); // Generate text from the file's content
    }
  });
}

/** read URL and make text from it. */

// Fetches text from a URL and generates new text using Markov chains.

async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Error reading URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}



// Analyze command-line arguments
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path); // Generate text from a file
} else if (method === "url") {
  makeURLText(path); // Generate text from a URL
} else {
  console.error(`Invalid method: "${method}"`);
  process.exit(1); // Exit due to invalid input
}
