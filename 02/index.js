const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);
const { runSequence } = require(`${__dirname}/../utils/oldComputer`);

const inputNumbers = () => parseNumbers(`${__dirname}/input.txt`, ',');

const shipComputer = (original, noun, verb) => {
  const input = [...original];
  // replace position 1 with the value 12 and replace position 2 with the value 2
  input[1] = noun;
  input[2] = verb;

  return runSequence(input).instructions;
};

// Part 2  we want index 0 to be 19690720 using which nouns and verbs?
const MIN = 0;
const MAX = 99;
const findNumber = (input, expected) => {
  let noun = 0;
  let verb = -1;
  do {
    verb++;
    if (verb > MAX) {
      noun++;
      verb = MIN;
    }

    if (noun > MAX) {
      throw Error('no correct answer found');
    }

    result = shipComputer(input, noun, verb)[0];
  } while (result !== expected);

  return 100 * noun + verb;
};

test(shipComputer(inputNumbers(), 12, 2)[0], 4330636)
test(shipComputer(inputNumbers(), 60, 86)[0], 19690720);
endTest();


console.log(`PART 1 - ${shipComputer(inputNumbers(), 12, 2)[0]}`);
console.log(`PART 2 - ${findNumber(inputNumbers(), 19690720)}`);