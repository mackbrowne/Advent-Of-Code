const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { findCombos } = require(`../utils/list`);
const { sum } = require(`../utils/reducers`);

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const findFault = async (list, preamble, combo) => {
  for (let i = preamble; i < list.length; i++) {
    const current = list[i];
    const subList = list.slice(i - preamble, i);
    try {
      await findCombos(subList, combo, (array) => sum(array) === current);
    } catch (e) {
      throw current;
    }
  }
};

const findSequence = (input, desired) => {
  for (let i = 2; i <= input.length; i++) {
    for (let j = 0; j < input.length - i; j++) {
      const subArray = input.slice(j, j + i);
      if (sum(subArray) === desired) {
        return sum([Math.min(...subArray), Math.max(...subArray)]);
      }
    }
  }
};

const TEST_INPUT = parseInput("test.txt").map(Number);
const INPUT = parseInput("input.txt").map(Number);

const run = async () => {
  try {
    await findFault(TEST_INPUT, 5, 2);
  } catch (exception) {
    test(exception, 127);
    test(findSequence(TEST_INPUT, exception), 62);
    // test(sum([Math.min(...result), Math.max(...result)]), 62);
  }

  try {
    await findFault(INPUT, 25, 2);
  } catch (exception) {
    console.log(`Part 1 - ${exception}`);
    console.log(`Part 2 - ${findSequence(INPUT, exception)}`);
  }
};

run();
endTest();
