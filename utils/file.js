const fs = require('fs');

const readFile = (inputFile, delimiter) =>
  fs
    .readFileSync(inputFile)
    .toString()
    .split(delimiter);

const parseItems = (inputFile, delimiter, parser) => readFile(inputFile,delimiter).map(parser);

const parseNumbers = (inputFile, delimiter) =>
  parseItems(inputFile, delimiter, Number);

module.exports = {
  readFile,
  parseItems,
  parseNumbers
};
