const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { multiply } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");
const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const ski = (lines, { x, y }) => {
  const TREE = "#";
  const HILL_WIDTH = lines[0].length;

  const traverse = (deltaX, deltaY, trees) => {
    let localDeltaX = deltaX % HILL_WIDTH;

    let localIndexX = localDeltaX - 1;
    if (localDeltaX === 0) localIndexX = HILL_WIDTH - 1;

    const localIndexY = deltaY - 1;

    // console.log(localIndexY, " ", localIndexX);
    // console.log(lines[localIndexY][localIndexX]);
    const hitTree = lines[localIndexY][localIndexX] === TREE
    if (hitTree) trees++;

    if (deltaY + y <= lines.length) {
      return traverse(deltaX + x, deltaY + y, trees);
    } else {
      return trees;
    }
  };

  let initDeltaX = 1,
    initDeltaY = 1,
    initTrees = 0;

  return traverse(initDeltaX, initDeltaY, initTrees);
};

const part1 = { x: 3, y: 1 };

const part2 = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];

const testResults = [2, 7, 3, 4, 2];

test(ski(test1, part1), 7);
part2.forEach((part, i) => test(ski(test1, part), testResults[i]));
endTest();

console.log(`Part 1 - ${ski(input, part1)}`);
console.log(`Part 2 - ${multiply(part2.map((part) => ski(input, part)))}`);
