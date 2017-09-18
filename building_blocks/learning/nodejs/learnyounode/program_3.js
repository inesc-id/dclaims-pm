var fs = require('fs')

fileStrings = fs.readFileSync(process.argv[2]).toString();

splitedStrings = fileStrings.split('\n')

console.log(splitedStrings.length-1)
