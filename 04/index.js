const fs = require('fs');
const inputFile = fs.readFileSync('input.txt')
.toString()
.split('\n');


const generatePermutations = (string) => permutation('', string);
const permutation = (start, string) => {
  //base case
  if ( string.length == 1 ) {
      return [ start + string ];
  } else {

      var returnResult = [];
      for (var i=0; i < string.length; i++) {
          var result = permutation(string[i], string.substr(0, i) + string.substr(i+1));
          for (var j=0; j<result.length; j++) {
              returnResult.push(start + result[j]);
          }
      }

      return returnResult;
  }
}

const isPermutation = (a, b) => {
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < b.length; j++) {
      if(isSame(a[i], b[j])){
        return true;
      }
    }
  }
  return false;
};

const isSame = (a, b) => a === b;

const validatePasswordList = (list, validator, partB) => {
  return list.reduce( (radix, row, rowIndex) => {
    let cols = row.split(' ');
    if(partB){
      console.log(`%${Math.round(rowIndex / list.length * 100)}`);
      cols = cols.map( col => generatePermutations(col) )
    }
    
    for (let i = 0; i < cols.length - 1; i++) {
      for (let j = i + 1; j < cols.length; j++) {
        if(validator(cols[i], cols[j])) return radix;
      }
    }
    return radix+1;
  }, 0);
};

console.log(`B - ${validatePasswordList(inputFile, isPermutation, true)}`);
console.log(`A - ${validatePasswordList(inputFile, isSame, false)}`);