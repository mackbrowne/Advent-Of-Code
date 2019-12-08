const { test, endTest } = require(`${__dirname}/../utils/test`);

const fiveDigitString = number => ('0000' + number).slice(-5);
const opsAndModes = command => {
  const [A, B, C, D, E] = fiveDigitString(command);
  return { op: Number(D + E), modes: [C, B, A].map(Number) };
};

//Opcode 3 takes a single integer as input and saves it to the position given by
//its only parameter. For example, the instruction 3,50 would take an input value and store
//it at address 50.

//Opcode 4 outputs the value of its only parameter. For example, the instruction 4,50 would
// output the value at address 50.

// Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer
// to the value from the second parameter. Otherwise, it does nothing.

// Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to
// the value from the second parameter. Otherwise, it does nothing.

// Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1
// in the position given by the third parameter. Otherwise, it stores 0.

// Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in
// the position given by the third parameter. Otherwise, it stores 0.

const opCodes = {
  99: 'STOP', // DONE
  1: (a, b) => a + b, // ADD
  2: (a, b) => a * b, // MULTIPLY
  3: a => a, // assign input to opCode
  4: a => a, // output a single param value
  5: (a, b) => (a !== 0 ? b : null),
  6: (a, b) => (a === 0 ? b : null),
  7: (a, b) => (a < b ? 1 : 0),
  8: (a, b) => (a === b ? 1 : 0),
};

const runSequence = (instructions, input = '') => {
  let output = '';

  let commandIndex = 0;
  let done = false;
  do {
    let { op, modes } = opsAndModes(instructions[commandIndex]);
    if (opCodes[op] === 'STOP') {
      done = true;
    } else if (!opCodes[op]) {
      throw Error(
        'No Operation for opcode -' + op + ' on command index: ' + commandIndex
      );
    } else {
      const firstParam = commandIndex + 1;
      const lastParam = commandIndex + opCodes[op].length;

      //paramIndex
      //0: address mode - get inputValue[param]
      //1: value mode - use param as value
      const addressOrValue = (param, paramIndex) =>
        modes[paramIndex] ? param : instructions[param];
      const params = instructions
        .slice(firstParam, lastParam + 1)
        .map(addressOrValue);

      if (op === 3) {
        instructions[commandIndex] = Number(input);

        commandIndex = lastParam + 1;
      } else if (op === 4) {
        output += params[0];

        commandIndex = lastParam + 1;
      } else if ([5, 6].includes(op)) {
        //it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
        const result = opCodes[op](...params);
        if (result !== null) {
          instructions[commandIndex] = result;
        } else {
          commandIndex = lastParam + 1;
        }
      } else {
        const address = lastParam + 1;
        instructions[instructions[address]] = opCodes[op](...params);

        commandIndex = address + 1;
      }
    }
  } while (!done);

  return { instructions, output };
};

const localParse = instructions => instructions.split(',').map(Number);
const localRunSequence = (instructions, input) =>
  runSequence(localParse(instructions), input);
const testInstructions = instructions =>
  localRunSequence(instructions).instructions.join(',');
const testOutput = (instructions, input) =>
  localRunSequence(instructions, input).output;

// test(testInstructions('1,0,0,0,99'), '2,0,0,0,99');
// test(testInstructions('2,3,0,3,99'), '2,3,0,6,99');
// test(testInstructions('2,4,4,5,99,0'), '2,4,4,5,99,9801');
// test(testInstructions('1,1,1,4,99,5,6,0,99'), '30,1,1,4,2,5,6,0,99');

// test(testInstructions('1002,4,3,4,33'), '1002,4,3,4,99');

// test(testOutput('3,0,4,0,99', '0'), '0');
// endTest();

module.exports = {
  runSequence,
};
