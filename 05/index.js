const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);
const { runSequence } = require(`${__dirname}/../utils/shipComputer`);

const inputNumbers = () => parseNumbers(`${__dirname}/input.txt`, ',');

// // //Equal 8
const test1 = () => parseNumbers(`${__dirname}/test1.txt`, ',');
test(runSequence(test1(), { 0: 8 })[0], 1);
test(runSequence(test1(), { 0: 10 })[0], 0);
test(runSequence(test1(), { 0: 6 })[0], 0);
test(runSequence(test1(), { 0: 3 })[0], 0);

// // //Less than 8
const test2 = () => parseNumbers(`${__dirname}/test2.txt`, ',');
test(runSequence(test2(), { 0: 6 })[0], 1);
test(runSequence(test2(), { 0: 7 })[0], 1);
test(runSequence(test2(), { 0: 8 })[0], 0);
test(runSequence(test2(), { 0: 9 })[0], 0);

// // //Equal 8
const test3 = () => parseNumbers(`${__dirname}/test3.txt`, ',');
test(runSequence(test3(), { 0: 8 })[0], 1);
test(runSequence(test3(), { 0: 1 })[0], 0);
test(runSequence(test3(), { 0: 6 })[0], 0);
test(runSequence(test3(), { 0: 3 })[0], 0);

// // //Less Than 8
const test4 = () => parseNumbers(`${__dirname}/test4.txt`, ',');
test(runSequence(test4(), { 0: 6 })[0], 1);
test(runSequence(test4(), { 0: 7 })[0], 1);
test(runSequence(test4(), { 0: 8 })[0], 0);
test(runSequence(test4(), { 0: 9 })[0], 0);

// //equal to 0 or not
const test5 = () => parseNumbers(`${__dirname}/test5.txt`, ',');
test(runSequence(test5(), { 0: 6 })[0], 1);
test(runSequence(test5(), { 0: 1 })[0], 1);
test(runSequence(test5(), { 0: 4 })[0], 1);
test(runSequence(test5(), { 0: 0 })[0], 0);

//greater equal lessthan 8
const test6 = () => parseNumbers(`${__dirname}/test6.txt`, ',');
test(runSequence(test6(), { 0: 6 })[0], 1);
test(runSequence(test6(), { 0: 1 })[0], 1);
test(runSequence(test6(), { 0: 4 })[0], 1);

// PASSING ALREADY
test(runSequence(test6(), { 0: 0 })[0], 0);

endTest();

console.log(`Part 1 - ${runSequence(inputNumbers(), { 0: 1 })[0]}`);
console.log(`Part 2 - ${runSequence(inputNumbers(), { 0: 5 })[0]}`);
