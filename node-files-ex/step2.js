const fs = require('fs');
const axios = require('axios')
const process = require('process')

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

const filePath = process.argv[2];
cat(filePath);


async function webCat(url){
    try {
        let result = await axios.get(url);
        console.log(result.data);
    } catch (err) {
        console.error(`Error getting ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];

if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path);
} else {
    cat(path);
}

