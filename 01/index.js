const { parseNumbers } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");
const { findCombos } = require("../utils/list");

const parseInput = (file) => parseNumbers(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const sum2020 = (combo) => sum(combo) === 2020;

const run = async () => {
  test(multiply(await findCombos(test1, 2, sum2020)), 514579);
  test(multiply(await findCombos(test1, 3, sum2020)), 241861950);
  endTest();

  console.log(`Part 1 - ${multiply(await findCombos(input, 2, sum2020))}`);
  console.log(`Part 2 - ${multiply(await findCombos(input, 3, sum2020))}`);
};

run();
