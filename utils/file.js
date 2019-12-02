const fs = require('fs');

const readFile = (inputFile, delimiter) =>
  fs
    .readFileSync(inputFile)
    .toString()
    .split(delimiter);

const readNumbers = (inputFile, delimiter) => readFile(inputFile, delimiter).map(Number);

module.exports = {
  readFile,
  readNumbers,
};
