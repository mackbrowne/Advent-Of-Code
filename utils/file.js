const fs = require('fs');

const readLines = inputFile =>
  fs
    .readFileSync(inputFile)
    .toString()
    .split('\n');

const readNumbers = inputFile => readLines(inputFile).map(Number);

module.exports = {
  readLines,
  readNumbers,
};
