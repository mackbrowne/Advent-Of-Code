const { parseNumbers } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sumReducer } = require(`../utils/reducers`);

const parseInput = file => parseNumbers(`${__dirname}/${file}`, '\n');

/*  Iterate through list of pairs and find sum */
const findSum = (input, sum, depth) => {
  const numbers = parseInput(input);

  let result;
  numbers.forEach((a, i) => {
    numbers.forEach((b,j)=> {
      if(j>i){
        if(a + b === sum) result = a * b;
      }
    });
  });

  return result;
}

const findSum3 = (input, sum) => {
  const numbers = parseInput(input);

  let result;
  numbers.forEach((a, i) => {
    numbers.forEach((b,j)=> {
      numbers.forEach((c,k)=> {
        if(j>i){
          if(k>j) {
            if(a + b + c === sum) result = a * b * c;
          }
        }
      });
    });
  });

  return result;
}

test(findSum('test1.txt', 2020), 514579);
test(findSum3('test1.txt', 2020), 241861950);
endTest();

// ANSWER Part 1
console.log(`Part 1 - ${findSum('input.txt', 2020)}`);
console.log(`Part 2 - ${findSum3('input.txt', 2020)}`);

