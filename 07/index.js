const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);
const { runSequence } = require(`${__dirname}/../utils/shipComputer.js`);

const MODULES = 5;
const MAX_PHASE = 4;

const validatePhases = phases => {
  const cache = [];
  return !phases.some(phase => {
    if (cache.includes(phase)) return true;
    else {
      cache.push(phase);
      return false;
    }
  });
};

const incrementPhases = phases => {
  let index = 0;

  while (index < MODULES) {
    if (phases[index] < MAX_PHASE) {
      phases[index]++;
      if(validatePhases(phases)){
        return phases;
      }else{
        return incrementPhases(phases);
      }
    } else {
      phases[index] = 0;
    }
    index++;
  }

  return null;
};


const runModules = (input, phases) => {
  let output = 0;
  for (let i = 0; i < MODULES; i++) {
    output = runSequence(input, { 0: phases[i], 1: output })[0];
  }
  return output;
};

const puzzleInput = () => parseNumbers(`${__dirname}/input.txt`, ',');

let phases = Array(MODULES).fill(0);
let bestResult = { max: 0, phases: [...phases] };
let done = false;
do {
  const result = runModules(puzzleInput(), phases);
  if (result > bestResult.max) {
    bestResult = { max: result, phases: [...phases] };
  }

  phases = incrementPhases(phases);
  if (phases === null) done = true;
} while (!done);


const test1Input = () => parseNumbers(`${__dirname}/test1.txt`, ',');
const test1Phases = [4, 3, 2, 1, 0];
test(runModules(test1Input(), test1Phases), 43210);

const test2Input = () => parseNumbers(`${__dirname}/test2.txt`, ',');
const test2Phases = [0, 1, 2, 3, 4];
test(runModules(test2Input(), test2Phases), 54321);

const test3Input = () => parseNumbers(`${__dirname}/test3.txt`, ',');
const test3Phases = [1, 0, 4, 3, 2];
test(runModules(test3Input(), test3Phases), 65210);

endTest();

console.log(bestResult);
