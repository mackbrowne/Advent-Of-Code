const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);
const { sum } = require("../utils/reducers");

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n");

const test1 = parseInput("test1.txt");
const test2 = parseInput("test2.txt");
const input = parseInput("input.txt");

const possibilities = { 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9' };
const checkForWord = line => {
  const result = Object.keys(possibilities).find(word => line.slice(0, word.length) === word);

  if (result)
    return possibilities[result]

  return false;
}

const findDigits = (line, reducer) => line.split('').reduce(reducer, [])
const findSumOfFirstAndLast = (allDigits) =>  Number(allDigits[0] + allDigits[allDigits.length - 1])
}

const findSumOfList = (input, reducer = (radix, char) => {
  if (!!Number(char)) return [...radix, char];
  else return radix;
}) => sum(input.map(line => Number(findSumOfFirstAndLast(findDigits(line, reducer)))))


const findSumOfListTricky = (input) => findSumOfList(input, reducer = (radix, char, index, array) => {
  if (!!Number(char))
    return [...radix, char];

  const result = checkForWord(array.slice(index).join(''));
  if (result)
    return [...radix, result]
  else
    return radix
})

const run = () => {
  test(findSumOfList(test1), 142);
  test(findSumOfListTricky(test2), 281);
  endTest();

  console.log(`Part 1 - ${findSumOfList(input)}`);
  console.log(`Part 2 - ${findSumOfListTricky(input)}`);
};

run();
