const { parseNumbers, readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum, multiply } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const input = parseInput("input.txt");

const part1Directions = {
  'forward': ({x, y}, distance) => ({
    x: x+distance,
    y 
  }),
  'down':({x, y}, distance) => ({
    x,
    y: y+distance 
  }),
  'up': ({x, y}, distance) => ({
    x,
    y: y-distance
  })
}

const part2Directions = {
  'forward': ({x, y, aim}, distance) => ({
    x: x+distance,
    y: y + aim * distance,
    aim
  }),
  'down':({x, y, aim}, distance) => ({
    x,
    y,
    aim: aim + distance 
  }),
  'up': ({x, y, aim}, distance) => ({
    x,
    y,
    aim: aim - distance
  })
}

const getPosition = (input, displacer) => {
  let location = {x: 0, y: 0, aim: 0};

  input.forEach(line => {
    const [direction, distance] = line.split(' ');
    location = displacer[direction](location, Number(distance));
  })

  return multiply([location.x, location.y]);
};

const run = () => {
  test(getPosition(test1, part1Directions), 150);
  test(getPosition(test1, part2Directions), 900);
  endTest();

  console.log(`Part 1 - ${getPosition(input, part1Directions)}`);
  console.log(`Part 2 - ${getPosition(input, part2Directions)}`);
};

run();
