// Test Suite
let testNum = 0;

const test = (input, output) =>
  console.log(`TEST ${++testNum} - ${input === output ? 'PASS' : `FAIL: ${input} !== ${output}`}`);

const endTest = () => {
  console.log();
  testNum = 0;
};

module.exports = {
  test,
  endTest,
};
