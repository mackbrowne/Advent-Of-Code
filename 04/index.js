const { test, endTest } = require(`${__dirname}/../utils/test`);

const input = '156218-652527';
const [MIN, MAX] = input.split('-').map(Number);

// Two adjacent digits are the same (like 22 in 122345).
const hasAdjacentChars = password =>
  password
    .split('')
    .some((letter, index, fullString) => letter === fullString[index - 1]);

// Two adjacent digits are the same (like 22 in 122345).
const has2AdjacentChars = password =>
  password
    .split('')
    .some(
      (letter, index, fullString) =>
        letter === fullString[index - 1] &&
        letter !== fullString[index - 2] &&
        letter !== fullString[index + 1]
    );

// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
const hasAnyDecreasingDigits = password =>
  password
    .split('')
    .map(Number)
    .some(
      (charValue, index, fullString) =>
        index > 0 && charValue < fullString[index - 1]
    );

const isPasswordValid = password =>
  password.length === 6 && !hasAnyDecreasingDigits(password);

const part1 = password =>
  isPasswordValid(password) && hasAdjacentChars(password);

const part2 = password =>
  isPasswordValid(password) && has2AdjacentChars(password);

const findPasswordsWithinRange = (min, max, validator) => {
  let count = 0;
  for (let i = min; i <= max; i++) {
    if (validator(`${i}`)) count++;
  }
  return count;
};

test(part1('111111'), true); // valid
test(part1('223450'), false); // invalid
test(part1('123789'), false); // invalid

test(part2('112233'), true); // valid
test(part2('123444'), false); // invalid
test(part2('111122'), true); // valid
endTest();

console.log(`Part 1 - ${findPasswordsWithinRange(MIN, MAX, part1)}`);
console.log(`Part 2 - ${findPasswordsWithinRange(MIN, MAX, part2)}`);
