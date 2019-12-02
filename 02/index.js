const { readNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);

const inputNumbers = readNumbers(`${__dirname}/input.txt`, ',');

const opCodes = {
  99: 'STOP', // DONE
  1: (a, b) => a + b, // ADD
  2: (a, b) => a * b, // MULTIPLY
};

const runSequence = inputValues => {
  inputValues.some((command, i) => {
    if (i % 4 === 0) {
      if (opCodes[command] === 'STOP') return true;
      let a = inputValues[inputValues[i + 1]];
      let b = inputValues[inputValues[i + 2]];
      inputValues[inputValues[i + 3]] = opCodes[command](a, b);
    }
  });
  return inputValues;
};

const localParse = input => input.split(',').map(Number);
test(runSequence(localParse('1,0,0,0,99')).join(','), '2,0,0,0,99');
test(runSequence(localParse('2,3,0,3,99')).join(','), '2,3,0,6,99');
test(runSequence(localParse('2,4,4,5,99,0')).join(','), '2,4,4,5,99,9801');
test(
  runSequence(localParse('1,1,1,4,99,5,6,0,99')).join(','),
  '30,1,1,4,2,5,6,0,99'
);

const shipComputer = (original, noun, verb) => {
  const input = [...original];
  // replace position 1 with the value 12 and replace position 2 with the value 2
  input[1] = noun;
  input[2] = verb;

  return runSequence(input);
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

test(shipComputer(inputNumbers, 60, 86)[0], 19690720);
endTest();

console.log(`PART 1 - ${shipComputer(inputNumbers, 12, 2)[0]}`);
console.log(`PART 2 - ${findNumber(inputNumbers, 19690720)}`);

module.exports = {
  shipComputer,
};
