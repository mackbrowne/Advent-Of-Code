const { parseItems } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");
const { findCombos } = require("../utils/list");

const matcher = (item) => item.match(/(\d+)-(\d+) (\D): (\D+)/);
const parseInput = (file) => parseItems(`${__dirname}/${file}`, "\n", matcher);

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const validate = (items, validator) =>
  items.map(validator).filter((item) => item).length;

const part1 = ([, min, max, letter, sequence]) => {
  const occurrences = sequence
    .split("")
    .filter((character) => character === letter).length;
  return occurrences >= min && occurrences <= max;
};

const part2 = ([, pos1, pos2, letter, sequence]) => [
  sequence[Number(pos1) - 1] === letter,
  sequence[Number(pos2) - 1] === letter,
].filter(item => item).length === 1;

test(validate(test1, part1), 2);
test(validate(test1, part2), 1);
endTest();

console.log(`Part 1 - ${validate(input, part1)}`);
console.log(`Part 2 - ${validate(input, part2)}`);
