const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const countBinary = (input, letterIndex) =>
  input.reduce(
    (acc, line, lineIndex) => {
      acc[line[letterIndex]].push(lineIndex);
      return acc;
    },
    { 1: [], 0: [] }
  );

const gamma = (letterResult) =>
  letterResult["1"].length >= letterResult["0"].length ? "1" : "0";
const epsilon = (letterResult) =>
  letterResult["1"].length < letterResult["0"].length ? "1" : "0";

const calculate = (input, condition) =>
  parseInt(
    [...input[0]]
      .map((letter, index) => {
        const letterResult = countBinary(input, index);
        return condition(letterResult);
      })
      .join(""),
    2
  );

const part1 = (input) => calculate(input, gamma) * calculate(input, epsilon);

const part2 = (input) => {
  let oxyList = [...input];
  let scrubberList = [...input];
  //check first letter

  let letterIndex = 0;
  do {
    if (oxyList.length > 1) {
      const count = countBinary(oxyList, letterIndex);
      const filteredIndexes = count[gamma(count)];
      oxyList = oxyList.filter((item, index) =>
        filteredIndexes.includes(index)
      );
    }

    if (scrubberList.length > 1) {
      const count = countBinary(scrubberList, letterIndex);
      const filteredIndexes = count[epsilon(count)];
      scrubberList = scrubberList.filter((item, index) =>
        filteredIndexes.includes(index)
      );
    }

    letterIndex++;
  } while ((oxyList.length > 1) | (scrubberList.length > 1));

  return [parseInt(oxyList[0], 2), parseInt(scrubberList[0], 2)];
};

const run = () => {
  test(part1(test1), 198);

  const part2Result = part2(test1);
  test(part2Result[0], 23);
  test(part2Result[1], 10);
  test(part2Result[0] * part2Result[1], 230);
  endTest();

  console.log(`Part 1 - ${part1(input)}`);
  console.log(`Part 2 - ${multiply(part2(input))}`);
};

run();
