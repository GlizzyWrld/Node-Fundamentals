/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const process = require('process');
const MarkovMachine = require('./markov');

const [, , type, input] = process.argv

function readFromFile(file) {
    try {
        const content = fs.readFileSync(file, 'utf-8')
        return content
    } catch(error){
        console.error(`Error reading file '${file}': ${error.message} `)
        process.exit(1);
    }
}

async function readFromURL(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error){
        console.error(`Error fetching URL '${url}': ${error.message}`)
        process.exit(1);
    }
}


function generateText(text) {
    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText();
    console.log(generatedText);
}

if (type === 'file') {
    generateText(readFromFile(input));
} else if (type === 'url') {
    readFromURL(input)
    .then((data) => generateText(data))
    .catch((error) => {
        console.error(`Error generating URL '${input}': ${error.message}`);
        process.exit(1);
    });
} else {
    console.error(`Invalid input type '${type}'. Expected 'file' or 'url'`)
    process.exit(1);
}


module.exports = {
    readFromFile,
    readFromURL,
    generateText,
}

