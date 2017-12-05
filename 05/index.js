const fs = require('fs');
const getInput = () => {
  return fs.readFileSync('input.txt')
  .toString()
  .split('\n')
  .map( line=>parseInt(line) );
}

const increment = num => num + 1;
const incrementDecrement = num => {
  if(num >= 3) return num - 1;
  return increment(num);
}

const jumpFile = (input, afterJump) => {
  let i = 0;
  let jumps = 0;
  while( i > -1 && i < input.length ) {
    const current = input[i];
    input[i] = afterJump(input[i]);
    i += current;
    jumps++;
  }
  return jumps;
}

console.log(`A - ${jumpFile(getInput(), increment)}`);
console.log(`B - ${jumpFile(getInput(), incrementDecrement)}`);