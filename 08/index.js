const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const parseInstructions = (file) =>
  parseInput(file).map((line) => {
    const [, command, direction, delta] = line.match(/(\w+) ([+|-])(\d+)/);
    return {
      command,
      distance: direction === "-" ? Number(delta) * -1 : Number(delta)
    };
  });

/**
 * acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.
 */

const COMMANDS = {
  // increases or decreases a single global value called the accumulator
  acc: (distance, acc, pos) => [acc + distance, pos + 1],
  jmp: (distance, acc, pos) => [acc, pos + distance],
  nop: (distance, acc, pos) => [acc, pos + 1],
};

const run = (instructions) => {
  const complete = new Array(instructions.length).fill(false);
  const recursive = (acc, pos) => {
    if (!!complete[pos]) throw Error(acc);
    if (pos < instructions.length) {
        const { command, distance } = instructions[pos];

      const result = COMMANDS[command](distance, acc, pos);
      complete[pos] = true;

      return recursive(...result);
    }

    return acc;
  };

  return recursive(0, 0);
};

const TEST_INSTRUCTIONS = parseInstructions("test.txt");
const INPUT_INSTRUCTIONS = parseInstructions("input.txt");

const findFault = (instructions) => {
  try {
    instructions.forEach(({ command, distance, complete }, index) => {
      const newList =  JSON.parse(JSON.stringify(instructions));
      
      if (command === "nop") {
        newList[index].command = "jmp";
      } else if (command === "jmp") {
        newList[index].command = "nop";
      }

      let result;
      try {
        result = run(newList);
      } catch (e) {}

      if (result) throw result;
    });
  } catch (result) {
    return result;
  }
};

try {
  run(TEST_INSTRUCTIONS);
} catch ({ message }) {
  test(Number(message), 5);
}

test(findFault(TEST_INSTRUCTIONS), 8);
endTest();

try {
  run(INPUT_INSTRUCTIONS);
} catch ({ message }) {
  console.log(`Part 1 - ${message}`);
}

console.log(`Part 2 - ${findFault(INPUT_INSTRUCTIONS)}`);
