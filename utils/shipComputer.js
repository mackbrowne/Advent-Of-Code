const IMMEDIATE = 1;

const getParameter = ({ memory, mode, parameter }) => {
  return mode === IMMEDIATE ? parameter : memory[parameter];
};

const addValues = ({ memory, position, mode1, mode2 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  const parameter3 = memory[position + 3];
  memory[parameter3] = parameter1 + parameter2;
  return position + 4;
};

const multiplyValues = ({ memory, position, mode1, mode2 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  const parameter3 = memory[position + 3];
  memory[parameter3] = parameter1 * parameter2;
  return position + 4;
};

const saveInputToPosition = ({ memory, position, inputs }) => {
  const parameter1 = memory[position + 1];
  memory[parameter1] = inputs[0];
  return position + 2;
};

const outputValue = ({ memory, position, outputs, mode1 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  outputs[0] = parameter1;
  return position + 2;
};

const jumpIfTrue = ({ memory, position, mode1, mode2 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  if (parameter1 !== 0) {
    return parameter2;
  }
  return position + 3;
};

const jumpIfFalse = ({ memory, position, mode1, mode2 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  if (parameter1 === 0) {
    return parameter2;
  }
  return position + 3;
};

const lessThan = ({ memory, position, mode1, mode2, mode3 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  const parameter3 = memory[position + 3];
  if (parameter1 < parameter2) {
    memory[parameter3] = 1;
  } else {
    memory[parameter3] = 0;
  }
  return position + 4;
};

const equals = ({ memory, position, mode1, mode2 }) => {
  const parameter1 = getParameter({
    memory,
    mode: mode1,
    parameter: memory[position + 1],
  });
  const parameter2 = getParameter({
    memory,
    mode: mode2,
    parameter: memory[position + 2],
  });
  const parameter3 = memory[position + 3];
  if (parameter1 === parameter2) {
    memory[parameter3] = 1;
  } else {
    memory[parameter3] = 0;
  }
  return position + 4;
};

const endProgram = ({ memory, position }) => {
  // report('Reached the end of the program at position', position)
  return -1;
};

const opcodes = {
  1: addValues,
  2: multiplyValues,
  3: saveInputToPosition,
  4: outputValue,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  99: endProgram,
};

const executeProgram = ({ memory, position, inputs, outputs }) => {
  const instruction = (memory[position] + '').split('');
  const opcode = Number.parseInt(
    [instruction.pop(), instruction.pop()].reverse().join('')
  );
  const mode1 = Number.parseInt(instruction.pop() || 0);
  const mode2 = Number.parseInt(instruction.pop() || 0);
  const mode3 = Number.parseInt(instruction.pop() || 0);

  try {
    return opcodes[opcode]({
      memory,
      position,
      inputs,
      outputs,
      mode1,
      mode2,
      mode3,
    });
  } catch (ex) {
    console.error(
      'Unable to execute instruction at',
      position,
      `(Opcode: ${opcode}, Modes: 1:${mode1}, 2:${mode2}, 3:${mode3})`,
      `[${memory[position]}]`,
      'memory dump:',
      memory.join(' ')
    );
    return -1;
  }
};
const runSequence = (memory, inputs) => {
    const outputs = {};
  
    let position = 0;
    do {
      position = executeProgram({ memory, position, inputs, outputs });
    } while (position !== -1);
  
    return outputs;
  };

module.exports = {
  runSequence,
};
