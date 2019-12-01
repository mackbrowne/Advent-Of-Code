// Test Suite
let testNum = 0;

const test = (input, output) =>
  console.log(`TEST ${++testNum} - ${input === output ? 'PASS' : 'FAIL'}`);

const endTest = () => {
  console.log('\r\n');
  testNum = 0;
};

module.exports = {
  test,
  endTest,
};
