const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum } = require("../utils/reducers");

const parseInput = (file) => parseNumbers(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const group3Windows = (values) =>
  values.reduce(
    (windowGroups, currentVal, index, array) => {
      if(index <= array.length - 2) windowGroups.push(sum([currentVal, array[index + 1], array[index + 2]]));
      return windowGroups;
    },
    []
  );

const countIncrease = (list) =>
  list.reduce(
    (result, currentVal, index, array) =>
      index > 0 && currentVal > array[index - 1] ? result + 1 : result,
    0
  );

const run = () => {
  test(countIncrease(test1), 7);
  test(countIncrease(group3Windows(test1)), 5);
  endTest();

  console.log(`Part 1 - ${countIncrease(input)}`);
  console.log(`Part 2 - ${countIncrease(group3Windows(input))}`);
};

run();
