const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n\n");

const parseDeclarations = (file, validator, counter) =>
  sum(
    parseInput(file).map((group) => {
      const declarations = {};
      const passengers = group.split("\n");
      passengers.forEach((person) => {
        person.split("").forEach(validator(declarations));
      });
      return counter(declarations, passengers);
    })
  );

const part1 = (file) => {
  const validator = (declarations) => (declaration) => {
    declarations[declaration] = true;
  };
  const counter = (declarations) => Object.keys(declarations).length;

  return parseDeclarations(file, validator, counter);
};

const part2 = (file) => {
  const validator = (declarations) => (declaration) => {
    if (declarations[declaration]) declarations[declaration]++;
    else declarations[declaration] = 1;
  };

  const counter = (declarations, passengers) =>
    Object.keys(declarations).reduce((prev, declaration) => {
      if (declarations[declaration] === passengers.length) return prev + 1;
      return prev;
    }, 0);

  return parseDeclarations(file, validator, counter);
};

test(part1("test.txt"), 11);
test(part2("test.txt"), 6);

endTest();

console.log(`Part 1 - ${part1("input.txt")}`);
console.log(`Part 2 - ${part2("input.txt")}`);
