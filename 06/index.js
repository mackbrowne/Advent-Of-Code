const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('input.txt')
  .toString()
  .split('\t')
  .map(line => parseInt(line));
};

const alreadyExisted = (stack, history) => history.indexOf( JSON.stringify(stack) ) === -1;

const incrementStack = (index, max) => {
  index++;
  if(index < max) return index;
  return 0;
}

const redestribute = stack => {
  const newStack = [...stack];
  let stackValue = Math.max(...newStack);
  let index = newStack.indexOf(stackValue);
  newStack[index] = 0;

  while(stackValue > 0){
    index = incrementStack(index, newStack.length);
    newStack[index]++;
    stackValue--;
  }
  return newStack;
};

const run = (input, validator) => {
  let currentStack = [ ...input ];
  const history = [];
  while(alreadyExisted(currentStack, history)) {
    history.push(JSON.stringify(currentStack));
    currentStack = redestribute(currentStack);
  };

  console.log(`Part A - ${history.length}`);

  const newValidator = [ ...currentStack ];
  const newHistory = [];
  while (alreadyExisted(newValidator, newHistory)) {
    currentStack = redestribute(currentStack);
    newHistory.push(JSON.stringify(currentStack));
  }

  console.log(`Part B - ${newHistory.length}`);
};

run(getInput());