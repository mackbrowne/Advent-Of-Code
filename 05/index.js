const { parseNumbers } = require(`${__dirname}/../utils/file`);
const { test, endTest } = require(`${__dirname}/../utils/test`);
const { runSequence } = require(`${__dirname}/../utils/shipComputer`);

const inputNumbers = parseNumbers(`${__dirname}/input.txt`, ',');

// test(runSequence(inputNumbers, '1').output, '0000000005074395');

// //Equal 8
// const test1 = parseNumbers(`${__dirname}/test1.txt`, ',');
// test(runSequence(test1, '8').output, '1');
// test(runSequence(test1, '10').output, '0');
// test(runSequence(test1, '6').output, '0');
// test(runSequence(test1, '3').output, '0');

// //Less than 8
// const test2 = parseNumbers(`${__dirname}/test2.txt`, ',');
// test(runSequence(test2, '6').output, '1');
// test(runSequence(test2, '7').output, '1');
// test(runSequence(test2, '8').output, '0');
// test(runSequence(test2, '9').output, '0');

// //Equal 8
// const test3 = parseNumbers(`${__dirname}/test3.txt`, ',');
// test(runSequence(test1, '8').output, '1');
// test(runSequence(test3, '10').output, '0');
// test(runSequence(test3, '6').output, '0');
// test(runSequence(test3, '3').output, '0');

// //Less Than 8
// const test4 = parseNumbers(`${__dirname}/test4.txt`, ',');
// test(runSequence(test4, '6').output, '1');
// test(runSequence(test4, '7').output, '1');
// test(runSequence(test4, '8').output, '0');
// test(runSequence(test4, '9').output, '0');

//equal to 0 or not
const test5 = () => parseNumbers(`${__dirname}/test5.txt`, ',');
test(runSequence(test5(), '6').output, '1');
test(runSequence(test5(), '1').output, '1');
test(runSequence(test5(), '4').output, '1');
test(runSequence(test5(), '0').output, '0');

//greater equal lessthan 8
const test6 = () => parseNumbers(`${__dirname}/test6.txt`, ',');
// test(runSequence(test6, '6').output, '1');
// test(runSequence(test6, '1').output, '1');
// test(runSequence(test6, '4').output, '1');
// test(runSequence(test6, '0').output, '0');
// test(runSequence(test5, '8').output, '1000');
// test(runSequence(test5, '9').output, '1001');

endTest();

//console.log(`Part 1 - ${runSequence(inputNumbers, '1').output}`);

//console.log(`Part 2 - ${Number(runSequence(inputNumbers, '5').output).toLocaleString('en')}`);

