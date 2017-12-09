const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('input.txt')
  .toString()
  .split('\n')
  .map( line => {
    // sdj dec 558 if r <= 8
    const [
      register,
      incDec,
      amount,
      ifStatement,
      firstHalf,
      operand,
      secondHalf
    ] = line.split(' ');

    return {
      register,
      incDec,
      amount,
      ifStatement,
      firstHalf,
      operand,
      secondHalf
    };
  });
};

const evalIf = (firstHalf = 0, operand, secondHalf) => {
  switch(operand) {
    case '<':
      return firstHalf < secondHalf;
    case '<=':
      return firstHalf <= secondHalf;
    case '>':
      return firstHalf > secondHalf;
    case '>=':
      return firstHalf >= secondHalf;
    case '==':
      return firstHalf == secondHalf;
    case '!=':
      return firstHalf != secondHalf;
    default:
      throw Error('somethingz messed');
  }
};

const doEval = (register = 0, incDec, amount) => {
  switch(incDec) {
    case 'inc':
      return register + amount;
    case 'dec':
      return register - amount;
    default:
      throw new Error('somethingz messed');
  }
};

const run = (input) => {
  const registers = {};
  const allValues = [];

  input.forEach(({
    register,
    incDec,
    amount,
    ifStatement,
    firstHalf,
    operand,
    secondHalf
  }) => {
    if(evalIf(
      registers[firstHalf],
      operand,
      parseInt(secondHalf)
    )){
      registers[register] = doEval(
        registers[register],
        incDec,
        parseInt(amount)
      );
      allValues.push(registers[register]);
    }
  });

  console.log(`A - ${Math.max(...Object.keys(registers).map( key => registers[key]))}`);
  console.log(`B - ${Math.max(...allValues)}`);
};

run(getInput())