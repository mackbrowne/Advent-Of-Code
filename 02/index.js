const fs = require('fs');
const inputFile = fs.readFileSync('input.txt')
.toString()
.split('\n')
.map( row => row.split('\t').map( col => parseInt(col)));

const checksum = (input, validator) => input.map(validator).reduce( (a, b) => a + b );

const maxMinValidator = (row) => {
    const max = Math.max(...row);
    const min = Math.min(...row);
    return max - min;
};

const evenValidator = (row) => {
  for (let i = 0; i < row.length - 1; i++) {
    for (let j = i + 1; j < row.length; j++) {
      const a = row[i];
      const b = row[j];
      if( a % b === 0 ){
        return a/b;
      }else if(b % a === 0){
        return b/a;
      }
    }
  }
};

console.log(`A - ${checksum(inputFile, maxMinValidator)}`);
console.log(`B - ${checksum(inputFile, evenValidator)}`);