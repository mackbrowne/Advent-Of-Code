const { readFile } = require(`../utils/file`);
const { test, endTest } = require(`../utils/test`);

const parseInput = (file) => readFile(`${__dirname}/${file}`, "\n\n");

const parsePassports = (file) =>
  parseInput(file).map((rawCredentials) =>
    rawCredentials
      .replaceAll("\n", " ")
      .split(" ")
      .reduce((base, credential) => {
        const [key, value] = credential.split(":");
        return {
          ...base,
          [key]: value,
        };
      }, {})
  );

const maxMin = (value, MIN, MAX) => value >= MIN && value <= MAX;

const FOUR_DIGITS_MAXMIN = (value, MIN, MAX) =>
  value.length === 4 &&
  !!value.match(/\d{4}/) &&
  maxMin(Number(value), MIN, MAX);

const NINE_DIGITS = (value, MIN, MAX) =>
  value.length === 9 && !!value.match(/\d{9}/);

const REQUIRED_CREDENTIALS = {
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  byr: (value) => FOUR_DIGITS_MAXMIN(value, 1920, 2002),

  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  iyr: (value) => FOUR_DIGITS_MAXMIN(value, 2010, 2020),

  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  eyr: (value) => FOUR_DIGITS_MAXMIN(value, 2020, 2030),

  // hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  hgt: (value) => {
    const match = value.match(/(\d+)(cm|in)/);
    if (!!match) {
      const [, height, unit] = match;
      if (unit === "cm" && maxMin(Number(height), 150, 193)) return true;
      if (unit === "in" && maxMin(Number(height), 59, 76)) return true;
    }
    return false;
  },

  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  hcl: (value) => !!value.match(/#[\da-f]{6}/),

  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  ecl: (value) => !!value.match(/amb|blu|brn|gry|grn|hzl|oth/),

  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  pid: (value) => NINE_DIGITS(value),
};

// Optional
// cid (Country ID) - ignored, missing or not.

const validatePassport = (file, validator) =>
  parsePassports(file)
    .map((passport) =>
      Object.keys(REQUIRED_CREDENTIALS).every(validator(passport))
    )
    .reduce((sum, current) => (current ? sum + 1 : sum), 0);

const BASIC = (passport) => (requirement) =>
  Object.keys(passport).includes(requirement);

const ADVANCED = (passport) => (requirement) =>
  BASIC(passport)(requirement) &&
  REQUIRED_CREDENTIALS[requirement](passport[requirement]);

// Test Part1
test(validatePassport("test1.txt", BASIC), 2);

// Part 2

// Test Values
test(REQUIRED_CREDENTIALS["byr"]("2002"), true);
test(REQUIRED_CREDENTIALS["byr"]("2003"), false);
test(REQUIRED_CREDENTIALS["hgt"]("60in"), true);
test(REQUIRED_CREDENTIALS["hgt"]("190cm"), true);
test(REQUIRED_CREDENTIALS["hgt"]("190in"), false);
test(REQUIRED_CREDENTIALS["hgt"]("190"), false);
test(REQUIRED_CREDENTIALS["hcl"]("#123abc"), true);
test(REQUIRED_CREDENTIALS["hcl"]("#123abz"), false);
test(REQUIRED_CREDENTIALS["hcl"]("123abc"), false);
test(REQUIRED_CREDENTIALS["ecl"]("brn"), true);
test(REQUIRED_CREDENTIALS["ecl"]("wat"), false);
test(REQUIRED_CREDENTIALS["pid"]("000000001"), true);
test(REQUIRED_CREDENTIALS["pid"]("0123456789"), false);

test(validatePassport("test2.txt", ADVANCED), 0);
test(validatePassport("test3.txt", ADVANCED), 4);

endTest();

console.log(`Part 1 - ${validatePassport("input.txt", BASIC)}`);
console.log(`Part 2 - ${validatePassport("input.txt", ADVANCED)}`);
