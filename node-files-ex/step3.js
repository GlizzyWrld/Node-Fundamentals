const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** Handle the output: write to a file if 'out' is given, else print */
function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', (err) => {
      if (err) {
        console.error(`Failed to write to ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

/** Read a file at the specified 'path' and print its contents */
function cat(path, out) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file at ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

/** Fetch the contents of a web page at the given 'url' and print them */
async function webCat(url, out) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, out);
  } catch (err) {
    console.error(`Failed to fetch the web page at ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.startsWith('http://') || path.startsWith('https://')) {
  webCat(path, out);
} else {
  cat(path, out);
}
