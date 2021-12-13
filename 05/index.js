const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const parseInstructions = (input) =>
  input.map((line) => line.split(" -> ").map((coord) => coord.split(",")));
const buildGrid = (SIZE) =>
  Array(SIZE+1)
    .fill(0)
    .map(() => Array(SIZE+1).fill(0));

const getMinMax = (set) => [Math.min(...set), Math.max(...set)];

const drawLines = (input, diagonal = false) => {
  const instructions = parseInstructions(input);

  const SIZE = Math.max(...instructions.flat(3).map(Number));
  const grid = buildGrid(SIZE);
  
  instructions.forEach(([from, to]) => {
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    if (fromX === toX) {
      const [min, max] = getMinMax([Number(fromY), Number(toY)]);
      for (let i = min; i <= max; i++) {
        grid[i][Number(fromX)]++;
      }
    } else if (fromY === toY) {
      const [min, max] = getMinMax([Number(fromX), Number(toX)]);
      for (let i = min; i <= max; i++) {
        grid[Number(fromY)][i]++;
      }
    } else if(diagonal) {
      const xDirection = Number(toX) - Number(fromX) > 0 ? 1 : -1;
      const yDirection = Number(toY) - Number(fromY) > 0 ? 1 : -1;
      const X = Number(fromX);
      const Y = Number(fromY);
      const diff = Math.abs(Number(fromX) - Number(toX));
      for (let i = 0; i <= diff; i++) {
        grid[Y + (i * yDirection)][X + (i * xDirection)]++;
      }
    }
  });
  return grid.flat(2).filter((item) => Number(item) >= 2).length;
};

const part1 = drawLines;

const part2 = (input) => drawLines(input, true);

const run = () => {
  test(part1(test1), 5);
  test(part2(test1), 12);
  endTest();

  console.log(`Part 1 - ${part1(input)}`);
  console.log(`Part 2 - ${part2(input)}`);
};

run();
