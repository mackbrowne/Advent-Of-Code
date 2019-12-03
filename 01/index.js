const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);
const { sumReducer } = require(`${__dirname}/../utils/reducers`);

const inputNumbers = parseNumbers(`${__dirname}/input.txt`, '\n');

/*  Specifically, to find the fuel required for a module, take its mass, 
    divide by three, round down, and subtract 2. */
const findFuel = mass => Math.floor(mass / 3) - 2;

test(findFuel(12), 2);
test(findFuel(12), 2);
test(findFuel(1969), 654);
test(findFuel(100756), 33583);
endTest();

// ANSWER Part 1
console.log(`Part 1 - ${inputNumbers.map(findFuel).reduce(sumReducer)}`);

// ANSWER Part 2
console.log(
  `Part 2 - ${inputNumbers
    .map(mass => {
      let moduleFuel = 0;
      let currentFuel = findFuel(mass);

      do {
        moduleFuel += currentFuel;
        currentFuel = findFuel(currentFuel);
      } while (currentFuel > 0);

      return moduleFuel;
    })
    .reduce(sumReducer)}`
);
