const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const INVENTORY = {r: 12, g: 13, b:14}

const findSumOfList = (input) => {
  console.log(input);
}

const run = () => {
  test(findSumOfList(test1.map(item => {
    return item.split(';')
  })), 8);
  // test(findSumOfListTricky(test2), 281);
  endTest();

  // console.log(`Part 1 - ${findSumOfList(input)}`);
  // console.log(`Part 2 - ${findSumOfListTricky(input)}`);
};

run();
