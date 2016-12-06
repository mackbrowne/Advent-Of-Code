let fs = require('fs');

let inputFile = fs.readFileSync('input.txt').toString().split("\n");
let strLength = inputFile[0].length;

function findSums(comparator){
  let sumArray = [];
  for(let i=0; i<strLength; i++){
    let sums = {};
    inputFile.forEach((line)=>{
      sums[line[i]]  = (isNaN(sums[line[i]] ) ? 1 : sums[line[i]]  + 1);
    });

    let arr = Object.keys( sums ).map(function ( key ) { return { key: key, sum: sums[key]}; });
    let bestValue = {value: arr[0].sum, key: arr[0].key};
    arr.forEach(function(value, index){
      if(value.key !== 'undefined' && comparator(value.sum, bestValue.value)){
        bestValue = { value: value.sum, key: value.key};
      }
    });
    sumArray.push(bestValue.key);
  }
  return sumArray.join('');
}

function part1(){
  console.log('part 1: ' + findSums((a, b)=>{
    return a > b;
  }));
}

function part2(){
  console.log('part 2: ' + findSums((a, b)=>{
    return a < b;
  }));
}

part1();
part2();
